/**
 * ScaleX — LSQ Stage Change → Google Ads Offline Conversion Relay
 * v9.0 — May 2026
 *
 * Changes from v8:
 * - FIXED: STAGE_MAP now matches Sumeet's full stage spec exactly
 *   - All Disqualified stages added (value=1, negative signal for Smart Bidding)
 *   - DROP_STAGES: AH, Missed Call, Existing — silently dropped, not sent
 *   - New log status: DROP
 * - CONFIRMED: No source filter — ALL leads sent regardless of source
 *   (PPC, Inbound, WhatsApp, walk-in — GCLID = direct match, no GCLID = EC match)
 *
 * Stage → Google Ads mapping:
 *   New Lead          → QUALIFIED ₹500    (Submit lead form)
 *   Future Interest   → QUALIFIED ₹1,000  (SignUp)
 *   ML-Enquiry        → QUALIFIED ₹1,000  (SignUp)
 *   Enquiry/Hot/Warm  → QUALIFIED ₹2,000  (Qualified Lead)
 *   Re-Enquiry etc    → QUALIFIED ₹2,000  (Qualified Lead)
 *   Enrolled          → CONVERTED ₹10,000 (Converted Lead)
 *   All Disqualified  → QUALIFIED ₹1      (negative signal)
 *   AH/Missed Call/Existing → DROP (not sent)
 *
 * Log sheet columns (21):
 * Timestamp | Status | Old Stage | New Stage | GCLID | Value (₹) |
 * Prospect ID | Name | Email | Phone | Source | Medium | Campaign |
 * Page URL | Lead Score | Engagement Score | FB Click ID |
 * Hashed Email | Hashed Phone | Conv Type | Message
 */


// ════════════════════════════════════════════════
// CONFIG
// ════════════════════════════════════════════════
const CONFIG = {
  DEVELOPER_TOKEN: 'OKYrRJ48L3KNIfuseAFQTw',
  CUSTOMER_ID:     '4064995850',
  MCC_ID:          '8910137241',
};

const CONV_NAMES = {
  QUALIFIED: 'crm_webhook_qualified_lead',
  CONVERTED: 'crm_webhook_converted_lead',
};

// ════════════════════════════════════════════════
// STAGE ROUTING
// ════════════════════════════════════════════════

// Stages to SILENTLY DROP — not sent to Google Ads at all
// AH = internal/inactive, Missed Call = no signal value,
// Existing = re-enrollment not new acquisition
const DROP_STAGES = {
  'AH':          true,
  'Missed Call': true,
  'Existing':    true,
};

// Stage → conversion bucket + proxy value
// ALL leads sent regardless of Source field
// (GCLID = direct match, no GCLID = EC match via email/phone)
const STAGE_MAP = {

  // ── New Lead (Submit lead form) ────────────────────────────
  'New Lead':                     { bucket: 'QUALIFIED', value: 500   },

  // ── MQL (SignUp) ───────────────────────────────────────────
  'Future Interest':              { bucket: 'QUALIFIED', value: 1000  },
  'FutureInterest':               { bucket: 'QUALIFIED', value: 1000  },
  'ML-Enquiry':                   { bucket: 'QUALIFIED', value: 1000  },

  // ── SQL (Qualified Lead) ───────────────────────────────────
  'Enquiry':                      { bucket: 'QUALIFIED', value: 2000  },
  'Hot':                          { bucket: 'QUALIFIED', value: 2000  },
  'Warm':                         { bucket: 'QUALIFIED', value: 2000  },
  'Re-Enquiry':                   { bucket: 'QUALIFIED', value: 2000  },
  'ReEnquiry':                    { bucket: 'QUALIFIED', value: 2000  },
  'Priority-Call':                { bucket: 'QUALIFIED', value: 2000  },
  'PriorityCall':                 { bucket: 'QUALIFIED', value: 2000  },

  // ── Enrolled (Converted Lead) ──────────────────────────────
  'Enrolled':                     { bucket: 'CONVERTED', value: 10000 },

  // ── Disqualified — value=1, negative signal for Smart Bidding
  // Google uses these to learn what bad leads look like
  // and avoids showing ads to similar users
  'Test':                         { bucket: 'QUALIFIED', value: 1 },
  'Not Interested':               { bucket: 'QUALIFIED', value: 1 },
  'Not Reachable':                { bucket: 'QUALIFIED', value: 1 },
  'Disqualified':                 { bucket: 'QUALIFIED', value: 1 },
  'Junk':                         { bucket: 'QUALIFIED', value: 1 },
  'RNR':                          { bucket: 'QUALIFIED', value: 1 },
  'Cold':                         { bucket: 'QUALIFIED', value: 1 },
  'Marketing Lead':               { bucket: 'QUALIFIED', value: 1 },
  'Recruitment/Hiring Candidate': { bucket: 'QUALIFIED', value: 1 },
  'Job Role/Trainer Job role':    { bucket: 'QUALIFIED', value: 1 },
  'Collaboration/College Events': { bucket: 'QUALIFIED', value: 1 },
  'Corporate Training':           { bucket: 'QUALIFIED', value: 1 },
};


// ════════════════════════════════════════════════
// LSQ API CREDENTIALS
// ════════════════════════════════════════════════
const LSQ_ACCESS_KEY = 'u$rfdb83f05f0b66fc1db816ac810a2e0d3';
const LSQ_SECRET_KEY = '5d1e931f0b5e3bbbdf4bfa24a3486e133c46cbb4';
const LSQ_BASE_URL   = 'https://api-in21.leadsquared.com/v2/LeadManagement.svc';


// ════════════════════════════════════════════════
// EC FOR LEADS — HASHING HELPERS
// ════════════════════════════════════════════════

function hashEmail(email) {
  if (!email) return null;
  const normalized = String(email).toLowerCase().trim();
  if (!normalized || !normalized.includes('@')) return null;
  return sha256Hex(normalized);
}

function hashPhone(phone) {
  if (!phone) return null;
  const e164 = normalizeToE164(String(phone));
  if (!e164) return null;
  return sha256Hex(e164);
}

function normalizeToE164(phone) {
  // Strip everything except digits
  const digits = phone.replace(/\D/g, '');

  // Indian numbers
  if (digits.length === 10) return '+91' + digits;
  if (digits.length === 12 && digits.startsWith('91')) return '+' + digits;
  if (digits.length === 13 && digits.startsWith('091')) return '+' + digits.slice(1);

  // Already has country code (12+ digits)
  if (digits.length > 10) return '+' + digits;

  Logger.log('normalizeToE164: could not normalize phone: ' + phone);
  return null;
}

function sha256Hex(s) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    s,
    Utilities.Charset.UTF_8
  );
  return digest.map(function(b) {
    return ('0' + (b & 0xFF).toString(16)).slice(-2);
  }).join('');
}


// ════════════════════════════════════════════════
// LSQ API — GCLID + PHONE LOOKUP
// Fetches full lead record by ProspectID
// Returns { gclid, phone } — both used for EC
// ════════════════════════════════════════════════
function fetchLeadFromLsq(prospectId) {
  if (!prospectId) return { gclid: '', phone: '' };

  try {
    const url = LSQ_BASE_URL + '/Leads.GetById'
      + '?accessKey=' + LSQ_ACCESS_KEY
      + '&secretKey=' + LSQ_SECRET_KEY
      + '&id='        + encodeURIComponent(prospectId);

    const response = UrlFetchApp.fetch(url, {
      method:             'get',
      muteHttpExceptions: true,
    });

    if (response.getResponseCode() !== 200) {
      Logger.log('LSQ API error ' + response.getResponseCode() + ' for ' + prospectId);
      return { gclid: '', phone: '' };
    }

    const lead   = JSON.parse(response.getContentText());
    const record = Array.isArray(lead) ? lead[0] : lead;
    if (!record) return { gclid: '', phone: '' };

    return {
      gclid: record.mx_GCLID || record.mx_gclid || '',
      phone: record.Phone     || record.Mobile   || '',
    };

  } catch (err) {
    Logger.log('fetchLeadFromLsq error: ' + err);
    return { gclid: '', phone: '' };
  }
}


// ════════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════════
function getAccessToken() {
  const props    = PropertiesService.getScriptProperties();
  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', {
    method:  'post',
    payload: {
      client_id:     props.getProperty('GOOGLE_ADS_CLIENT_ID'),
      client_secret: props.getProperty('GOOGLE_ADS_CLIENT_SECRET'),
      refresh_token: props.getProperty('GOOGLE_ADS_REFRESH_TOKEN'),
      grant_type:    'refresh_token',
    },
    muteHttpExceptions: true,
  });
  const data = JSON.parse(response.getContentText());
  if (!data.access_token) throw new Error('Token exchange failed: ' + response.getContentText());
  return data.access_token;
}


// ════════════════════════════════════════════════
// doPost — main entry point
// ════════════════════════════════════════════════
function doPost(e) {
  if (!e.postData) return ok('get_ignored');

  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    log('PARSE_ERROR', '', '', '', 0, {}, body, null, null, 'raw', String(e.postData.contents).slice(0, 200));
    return ok('parse_error');
  }

  // ── Dual-format detection ─────────────────────────────────
  const isSgtm = !!body.new_stage;
  const before = isSgtm ? {} : (body.Before || {});
  const after  = isSgtm ? {} : (body.After  || {});

  const oldStage   = isSgtm ? (body.old_stage   || '') : (before.ProspectStage || '');
  const newStage   = isSgtm ? (body.new_stage   || '') : (after.ProspectStage  || '');
  const source     = isSgtm ? (body.source      || '') : (after.Source         || '');
  const campaign   = isSgtm ? (body.campaign    || '') : (after.SourceCampaign || '');
  const prospectId = isSgtm ? (body.ProspectID  || '') : (after.ProspectID     || '');

  // Email + phone from payload (sGTM tag must send phone from v8 onwards)
  let email = isSgtm ? (body.email || '') : (after.EmailAddress || '');
  let phone = isSgtm ? (body.phone || '') : (after.Phone        || '');

  // ── GCLID resolution ─────────────────────────────────────
  let gclid = isSgtm
    ? (body.mx_GCLID  || body.mx_gclid  || '')
    : (after.mx_GCLID || after.mx_gclid || '');

  // Level 2: LSQ API lookup — also fetches phone if missing
  if ((!gclid || !phone) && prospectId) {
    Logger.log('Calling LSQ API for ProspectID: ' + prospectId);
    const lsqData = fetchLeadFromLsq(prospectId);
    if (!gclid && lsqData.gclid) {
      gclid = lsqData.gclid;
      Logger.log('LSQ API returned GCLID: ' + gclid.slice(0, 20) + '...');
    }
    if (!phone && lsqData.phone) {
      phone = lsqData.phone;
      Logger.log('LSQ API returned phone: ' + phone);
    }
  }

  // ── Stage check ───────────────────────────────────────────
  // Step 1: silently drop inactive stages
  if (DROP_STAGES[newStage]) {
    log('DROP', oldStage, newStage, gclid, 0, after, body, null, null, 'none',
      'Stage "' + newStage + '" is inactive — dropped, not sent to Google Ads');
    return ok('dropped');
  }

  // Step 2: check if stage triggers a conversion
  const stageConfig = STAGE_MAP[newStage];
  if (!stageConfig) {
    log('SKIP', oldStage, newStage, gclid, 0, after, body, null, null, 'none',
      'Stage "' + newStage + '" not in STAGE_MAP — no conversion sent');
    return ok('skipped');
  }

  // ── Build user_identifiers for EC ─────────────────────────
  const hEmail = hashEmail(email);
  const hPhone = hashPhone(phone);
  const userIdentifiers = [];
  if (hEmail) userIdentifiers.push({ hashedEmail: hEmail });
  if (hPhone) userIdentifiers.push({ hashedPhoneNumber: hPhone });

  // ── Determine conversion type ─────────────────────────────
  // GCLID + EC, GCLID only, EC only, or nothing
  const hasGclid = !!gclid;
  const hasEC    = userIdentifiers.length > 0;

  if (!hasGclid && !hasEC) {
    log('NO_GCLID', oldStage, newStage, '', stageConfig.value, after, body,
      hEmail, hPhone, 'none',
      'No GCLID and no hashed identifiers. Source: ' + source + ' / Campaign: ' + campaign);
    return ok('no_gclid');
  }

  const convType = hasGclid && hasEC ? 'gclid+ec' : hasGclid ? 'gclid' : 'ec_only';

  // ── Get conversion action ID ──────────────────────────────
  const convId = PropertiesService.getScriptProperties()
                                  .getProperty('CONV_ID_' + stageConfig.bucket);
  if (!convId) {
    log('NO_CONV_ID', oldStage, newStage, gclid, stageConfig.value, after, body,
      hEmail, hPhone, convType, 'Conversion action ID not cached — run setupScript()');
    return ok('no_conv_id');
  }

  // ── Upload conversion ─────────────────────────────────────
  const result = uploadConversion(gclid, convId, stageConfig.value, userIdentifiers);
  const status = result.status === 'SUCCESS'
    ? (convType === 'ec_only' ? 'SUCCESS_EC_ONLY' : 'SUCCESS')
    : result.status;

  log(status, oldStage, newStage, gclid, stageConfig.value, after, body,
    hEmail, hPhone, convType, result.message);
  return ok(status);
}


// ════════════════════════════════════════════════
// Google Ads API — uploadClickConversions
// Now includes user_identifiers for EC for Leads
// ════════════════════════════════════════════════
function uploadConversion(gclid, conversionActionId, value, userIdentifiers) {
  const token    = getAccessToken();
  const props    = PropertiesService.getScriptProperties();
  const custId   = props.getProperty('CUSTOMER_ID');
  const mccId    = props.getProperty('MCC_ID');
  const devToken = props.getProperty('DEVELOPER_TOKEN');

  const convDateTime = Utilities.formatDate(
    new Date(), 'Asia/Kolkata', "yyyy-MM-dd HH:mm:ss+05:30"
  );

  // Build conversion object
  const conversion = {
    conversionAction:   'customers/' + custId + '/conversionActions/' + conversionActionId,
    conversionDateTime: convDateTime,
    conversionValue:    value,
    currencyCode:       'INR',
  };

  // Only add gclid if present (EC-only path has no gclid)
  if (gclid) conversion.gclid = gclid;

  // Add user_identifiers for EC for Leads
  if (userIdentifiers && userIdentifiers.length > 0) {
    conversion.userIdentifiers = userIdentifiers;
  }

  const body = {
    conversions:    [conversion],
    partialFailure: true,
  };

  let response;
  try {
    response = UrlFetchApp.fetch(
      'https://googleads.googleapis.com/v23/customers/' + custId + ':uploadClickConversions',
      {
        method:  'post',
        headers: {
          'Authorization':     'Bearer ' + token,
          'developer-token':   devToken,
          'login-customer-id': mccId,
          'Content-Type':      'application/json',
        },
        payload:            JSON.stringify(body),
        muteHttpExceptions: true,
      }
    );
  } catch (err) {
    return { status: 'FETCH_ERROR', message: err.message };
  }

  const code = response.getResponseCode();
  const text = response.getContentText();

  if (code === 200) {
    const parsed = JSON.parse(text);
    if (parsed.partialFailureError) {
      return { status: 'GADS_PARTIAL_FAIL', message: parsed.partialFailureError.message };
    }
    return {
      status:  'SUCCESS',
      message: '✅ ₹' + value + ' sent | gclid: ' + (gclid ? gclid.slice(0,20)+'...' : 'none') +
               ' | EC identifiers: ' + (userIdentifiers ? userIdentifiers.length : 0),
    };
  }

  return { status: 'HTTP_' + code, message: text.slice(0, 400) };
}


// ════════════════════════════════════════════════
// SETUP
// ════════════════════════════════════════════════
function setupScript() {
  const props = PropertiesService.getScriptProperties();
  props.setProperties({
    DEVELOPER_TOKEN: CONFIG.DEVELOPER_TOKEN,
    CUSTOMER_ID:     CONFIG.CUSTOMER_ID,
    MCC_ID:          CONFIG.MCC_ID,
  });
  Logger.log('✅ Credentials stored.');
  let token;
  try {
    token = getAccessToken();
    Logger.log('✅ Access token obtained.');
  } catch (err) {
    Logger.log('❌ Token failed: ' + err.message);
    return;
  }
  const success = refreshConversionActionIds(token);
  if (success) {
    Logger.log('✅ Setup complete.');
    Logger.log('   QUALIFIED ID: ' + props.getProperty('CONV_ID_QUALIFIED'));
    Logger.log('   CONVERTED ID: ' + props.getProperty('CONV_ID_CONVERTED'));
  }
}

function refreshConversionActionIds(token) {
  if (!token) token = getAccessToken();
  const props    = PropertiesService.getScriptProperties();
  const custId   = props.getProperty('CUSTOMER_ID');
  const mccId    = props.getProperty('MCC_ID');
  const devToken = props.getProperty('DEVELOPER_TOKEN');
  const query = "SELECT conversion_action.id, conversion_action.name FROM conversion_action WHERE conversion_action.name IN ('" + CONV_NAMES.QUALIFIED + "','" + CONV_NAMES.CONVERTED + "')";
  let response;
  try {
    response = UrlFetchApp.fetch(
      'https://googleads.googleapis.com/v23/customers/' + custId + '/googleAds:searchStream',
      {
        method:  'post',
        headers: { 'Authorization':'Bearer '+token, 'developer-token':devToken, 'login-customer-id':mccId, 'Content-Type':'application/json' },
        payload: JSON.stringify({ query: query }),
        muteHttpExceptions: true,
      }
    );
  } catch (err) { Logger.log('❌ API call failed: ' + err.message); return false; }
  const code = response.getResponseCode();
  if (code !== 200) { Logger.log('❌ ' + code + ': ' + response.getContentText()); return false; }
  const results = JSON.parse(response.getContentText());
  if (!results || !results[0] || !results[0].results) { Logger.log('❌ No results.'); return false; }
  results[0].results.forEach(function(r) {
    const name = r.conversionAction.name, id = r.conversionAction.id;
    Logger.log('  Found: "' + name + '" → ID ' + id);
    if (name === CONV_NAMES.QUALIFIED) props.setProperty('CONV_ID_QUALIFIED', id);
    if (name === CONV_NAMES.CONVERTED) props.setProperty('CONV_ID_CONVERTED', id);
  });
  return true;
}


// ════════════════════════════════════════════════
// LOGGING — 21 columns (3 new: hashed_email, hashed_phone, conv_type)
// ════════════════════════════════════════════════
function log(status, oldStage, newStage, gclid, value, after, rawBody, hEmail, hPhone, convType, message) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh   = ss.getSheetByName('Log');

  if (!sh) {
    sh = ss.insertSheet('Log');
    const headers = [
      'Timestamp','Status','Old Stage','New Stage','GCLID','Value (₹)',
      'Prospect ID','Name','Email','Phone','Source','Medium','Campaign',
      'Page URL','Lead Score','Engagement Score','FB Click ID',
      'Hashed Email','Hashed Phone','Conv Type','Message'
    ];
    sh.appendRow(headers);
    sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#137333').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
    [160,120,110,110,230,80,130,130,200,110,100,100,200,260,90,130,110,80,80,80,350].forEach(function(w,i){sh.setColumnWidth(i+1,w);});
  }

  const isSgtm     = rawBody && !!rawBody.new_stage;
  const prospectId = after.ProspectID      || (isSgtm ? (rawBody.ProspectID || '') : '');
  const firstName  = after.FirstName        || '';
  const lastName   = after.LastName         || '';
  const fullName   = (firstName + ' ' + lastName).trim();
  const email      = after.EmailAddress     || (isSgtm ? (rawBody.email     || '') : '');
  const phone      = after.Phone            || (isSgtm ? (rawBody.phone     || '') : '');
  const src        = after.Source           || (isSgtm ? (rawBody.source    || '') : '');
  const medium     = after.SourceMedium     || '';
  const camp       = after.SourceCampaign   || (isSgtm ? (rawBody.campaign  || '') : '');
  const pageUrl    = after.mx_Page_Url      || '';
  const leadScore  = after.Score            || '';
  const engScore   = after.EngagementScore  || '';
  const fbclid     = after.FacebookId       || '';

  sh.appendRow([
    new Date(), status||'', oldStage||'', newStage||'', gclid||'', value||0,
    prospectId, fullName, email, phone, src, medium, camp, pageUrl,
    leadScore, engScore, fbclid,
    hEmail  ? hEmail.slice(0,12)+'...'  : '',   // store prefix only for auditability
    hPhone  ? hPhone.slice(0,12)+'...'  : '',
    convType || '',
    message || '',
  ]);
}

function ok(msg) {
  return ContentService.createTextOutput(msg).setMimeType(ContentService.MimeType.TEXT);
}


// ════════════════════════════════════════════════
// ITEM 3 — LSQ PPC AUDIT
// Pulls LSQ leads where Source = PPC* and mx_gclid is empty
// Run manually: select auditPpcNoGclid → Run
// ════════════════════════════════════════════════
function auditPpcNoGclid() {
  Logger.log('Starting LSQ PPC no-GCLID audit...');

  // Search LSQ for leads with PPC source created in last 30 days
  const searchUrl = LSQ_BASE_URL + '/Leads.GetAll'
    + '?accessKey=' + LSQ_ACCESS_KEY
    + '&secretKey=' + LSQ_SECRET_KEY
    + '&Parameter.FilterParams[0].Attribute=Source'
    + '&Parameter.FilterParams[0].Operator=Contains'
    + '&Parameter.FilterParams[0].Value=PPC'
    + '&Parameter.Paging.PageIndex=1'
    + '&Parameter.Paging.PageSize=200';

  try {
    const resp = UrlFetchApp.fetch(searchUrl, { method:'get', muteHttpExceptions:true });
    if (resp.getResponseCode() !== 200) {
      Logger.log('LSQ search error: ' + resp.getResponseCode() + ' — ' + resp.getContentText().slice(0,200));
      return;
    }

    const data  = JSON.parse(resp.getContentText());
    const leads = data.Leads || data || [];

    Logger.log('Total PPC leads found: ' + leads.length);

    let total = 0, hasEmail = 0, hasPhone = 0, hasBoth = 0, hasNeither = 0, noGclid = 0;

    leads.forEach(function(lead) {
      const gclid = lead.mx_GCLID || lead.mx_gclid || '';
      if (gclid) return; // skip leads that have GCLID

      noGclid++;
      const email = lead.EmailAddress || '';
      const phone = lead.Phone || lead.Mobile || '';
      const hasE  = !!email.trim();
      const hasP  = !!phone.trim();

      if (hasE && hasP)  hasBoth++;
      else if (hasE)     hasEmail++;
      else if (hasP)     hasPhone++;
      else               hasNeither++;
      total++;
    });

    Logger.log('=== PPC leads with NO GCLID ===');
    Logger.log('Total:       ' + total);
    Logger.log('Email only:  ' + hasEmail  + ' (' + pct(hasEmail, total)  + '%)');
    Logger.log('Phone only:  ' + hasPhone  + ' (' + pct(hasPhone, total)  + '%)');
    Logger.log('Both:        ' + hasBoth   + ' (' + pct(hasBoth, total)   + '%)');
    Logger.log('Neither:     ' + hasNeither+ ' (' + pct(hasNeither, total) + '%)');
    Logger.log('Has email:   ' + (hasEmail+hasBoth) + ' (' + pct(hasEmail+hasBoth, total) + '%)');
    Logger.log('Has phone:   ' + (hasPhone+hasBoth) + ' (' + pct(hasPhone+hasBoth, total) + '%)');
    Logger.log('EC-recoverable (email or phone): ' + (total-hasNeither) + ' (' + pct(total-hasNeither,total) + '%)');

  } catch (err) {
    Logger.log('auditPpcNoGclid error: ' + err);
  }
}

function pct(n, total) {
  return total > 0 ? Math.round((n/total)*100) : 0;
}


// ════════════════════════════════════════════════
// TESTS
// ════════════════════════════════════════════════
function testDisqualified() {
  Logger.log('Testing disqualified stage (RNR → should send value=1)...');
  const mockPayload = {
    Before: { ProspectStage: 'Enquiry' },
    After: {
      ProspectID:    'test-disq-001',
      ProspectStage: 'RNR',
      FirstName:     'Test',
      LastName:      'Disqualified',
      EmailAddress:  'test@analytixlabs.co.in',
      Phone:         '9999999999',
      mx_GCLID:      'CjwKCAjwtvvPBhBuEiwAPMijr3oMtr4A5IsovwYYTxzs-test-gclid',
      Source:        'PPC_CheckEligibility',
    }
  };
  const mockEvent = { postData: { contents: JSON.stringify(mockPayload) } };
  const result    = doPost(mockEvent);
  Logger.log('Result: ' + result.getContent());
  Logger.log('Expected: GADS_PARTIAL_FAIL (fake gclid) but value=1 sent');
}

function testDropStage() {
  Logger.log('Testing DROP stage (AH — should be silently dropped)...');
  const mockPayload = {
    Before: { ProspectStage: 'New Lead' },
    After: {
      ProspectID:    'test-drop-001',
      ProspectStage: 'AH',
      FirstName:     'Test',
      LastName:      'Drop',
      EmailAddress:  'test@analytixlabs.co.in',
      Phone:         '9999999999',
      mx_GCLID:      'any-gclid',
      Source:        'Inbound',
    }
  };
  const mockEvent = { postData: { contents: JSON.stringify(mockPayload) } };
  const result    = doPost(mockEvent);
  Logger.log('Result: ' + result.getContent());
  Logger.log('Expected: dropped');
}

function testEcOnly() {
  Logger.log('Testing EC-only path (no GCLID, has email + phone)...');
  const mockPayload = {
    Before: { ProspectStage: 'New Lead' },
    After: {
      ProspectID:    'test-ec-only-001',
      ProspectStage: 'Enquiry',
      FirstName:     'EC',
      LastName:      'Test',
      EmailAddress:  'test@analytixlabs.co.in',
      Phone:         '9999999999',
      Source:        'PPC_CheckEligibility',
      // No mx_GCLID — should fire via EC only
    }
  };
  const mockEvent = { postData: { contents: JSON.stringify(mockPayload) } };
  const result    = doPost(mockEvent);
  Logger.log('Result: ' + result.getContent());
}

function testGclidPlusEc() {
  Logger.log('Testing GCLID + EC path...');
  const mockPayload = {
    Before: { ProspectStage: 'New Lead' },
    After: {
      ProspectID:    'test-gclid-ec-001',
      ProspectStage: 'Enquiry',
      FirstName:     'Full',
      LastName:      'Test',
      EmailAddress:  'test@analytixlabs.co.in',
      Phone:         '9999999999',
      mx_GCLID:      'CjwKCAjwtvvPBhBuEiwAPMijr3oMtr4A5IsovwYYTxzs-test-gclid',
      Source:        'PPC_CheckEligibility',
    }
  };
  const mockEvent = { postData: { contents: JSON.stringify(mockPayload) } };
  const result    = doPost(mockEvent);
  Logger.log('Result: ' + result.getContent());
}

function testHashing() {
  Logger.log('Testing hashing functions...');
  Logger.log('Email hash: ' + hashEmail('Test@AnalytixLabs.co.in'));
  Logger.log('Phone hash (10 digit): ' + hashPhone('9999999999'));
  Logger.log('Phone hash (+91): ' + hashPhone('+919999999999'));
  Logger.log('Phone hash (91+10): ' + hashPhone('919999999999'));
}

function testReEngagement() {
  Logger.log('Testing re-engagement GCLID+phone lookup...');
  const mockPayload = {
    Before: { ProspectStage: 'New Lead' },
    After: {
      ProspectID:    '0e6252ca-3e4b-4621-9351-59672d2d2aa6', // real ProspectID with GCLID in LSQ
      ProspectStage: 'Enquiry',
      FirstName:     'Test',
      LastName:      'ReEngagement',
      EmailAddress:  'test@analytixlabs.co.in',
      // No mx_GCLID — should call LSQ API
    }
  };
  const mockEvent = { postData: { contents: JSON.stringify(mockPayload) } };
  const result    = doPost(mockEvent);
  Logger.log('Result: ' + result.getContent());
}


// ════════════════════════════════════════════════
// DIAGNOSTICS
// ════════════════════════════════════════════════
function checkSetup() {
  const props = PropertiesService.getScriptProperties().getProperties();
  Logger.log('=== Script Properties ===');
  Object.keys(props).sort().forEach(function(k) {
    const sensitive = ['DEVELOPER_TOKEN','GOOGLE_ADS_CLIENT_SECRET','GOOGLE_ADS_REFRESH_TOKEN'];
    const v = sensitive.includes(k) ? props[k].slice(0,6)+'****' : props[k];
    Logger.log('  ' + k + ': ' + v);
  });
}

function testTokenOnly() {
  try {
    const token = getAccessToken();
    Logger.log('✅ Token: ' + token.slice(0,20) + '...');
  } catch (err) {
    Logger.log('❌ ' + err.message);
  }
}

function checkConversionUploadStatus() {
  const token    = getAccessToken();
  const props    = PropertiesService.getScriptProperties();
  const custId   = props.getProperty('CUSTOMER_ID');
  const mccId    = props.getProperty('MCC_ID');
  const devToken = props.getProperty('DEVELOPER_TOKEN');
  const query = "SELECT conversion_action.name,conversion_action.id,conversion_action.status,metrics.all_conversions,metrics.all_conversions_value FROM conversion_action WHERE conversion_action.name IN ('crm_webhook_qualified_lead','crm_webhook_converted_lead')";
  const response = UrlFetchApp.fetch(
    'https://googleads.googleapis.com/v23/customers/' + custId + '/googleAds:searchStream',
    { method:'post', headers:{'Authorization':'Bearer '+token,'developer-token':devToken,'login-customer-id':mccId,'Content-Type':'application/json'}, payload:JSON.stringify({query:query}), muteHttpExceptions:true }
  );
  Logger.log(response.getContentText());
}
