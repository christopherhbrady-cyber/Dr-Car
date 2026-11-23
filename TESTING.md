# Dr Car — Free public prototype test checklist

The public site uses GitHub Pages, built-in JavaScript diagnostic rules, and browser speech interfaces. It does **not** make paid AI API requests. GitHub Pages and browser speech features are subject to their own availability, policies, and limits. Browser speech recognition may use a vendor's online service.

## Manual test before sharing widely

1. **Basic intake:** Open the site in Chrome or Edge. Enter a 1979 Pontiac Trans Am, Oldsmobile 403 V8, "cranks but won't start," and choose **Analyze Symptoms**. Confirm that explanations are possibilities, not definitive repairs.
2. **Normal voice:** Choose **Start conversation** and **Talk**, permit the microphone, and answer one prompt at a time. Confirm that voice output plays and spoken replies appear in the transcript.
3. **Text fallback:** Deny microphone access or use a browser without speech recognition. Check that typing a reply and pressing **Send** still works.
4. **Privacy:** Save a vehicle profile and reload it in the same browser. Use **Delete saved profile** and confirm that loading no longer retrieves it. Verify that a different browser does not automatically have that profile.
5. **Safety—typed hazard:** Enter "There is an active fuel leak" in Symptoms without selecting safety boxes, then Analyze. Confirm the safety hard-stop panel appears and DIY analysis is hidden.
6. **Safety—selected flag:** Select **Major brake failure / pedal to floor** and Analyze. Confirm the safety hard-stop panel appears.
7. **Safety—ordinary problem:** Enter "Engine cranks but will not start" without a safety flag. Confirm that the ordinary diagnostic path remains available.
8. **Save/print:** Generate results, then test print and downloadable notes. Confirm private information is not included unless the user entered it.
9. **Mobile:** Open on iPhone/Android and check text layout and form/print controls. Voice may differ by browser and device.
10. **Cost monitoring:** Verify the site never requests an API key or payment. If a paid AI model is added later, do not embed private API keys in client-side files.

## Known limits

- This is a rule-based educational diagnostic guide, **not** a live generative-AI chat service or a certified vehicle diagnosis.
- Voice availability and selected voices depend on the browser/device.
- Saved profiles are local to each browser, not cloud accounts.
- Safety phrase recognition is conservative but cannot identify every hazardous description. Users must still use the safety checklist and professional judgment.
- Repair price and time ranges are rough planning estimates; verify against local quotes and exact service manuals.

## Release notes — 2026-11-23

- Added privacy and free-use explanation.
- Added control to delete locally saved vehicle profile.
- Explained browser/provider-dependent speech recognition.
- Added typed-symptom screening for key safety-critical phrases before normal DIY triage.
