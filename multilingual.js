/* Dr Car multilingual voice companion; no paid AI/API. */
(()=>{
"use strict";
const el=id=>document.getElementById(id);
const Speech=window.SpeechRecognition||window.webkitSpeechRecognition, synth=window.speechSynthesis;
const packs={
"en-US":["English","Hi there! I'm Mr Car. What year, make and model is your vehicle?","Please tell me the year, make and model. You can also enter them in the form.","What problem are you having with the car?","Does the problem happen when the engine is cold, hot, or both?","When you turn the key, does it crank normally, slowly, or not at all?","What have you already checked, and what happened?","Thanks. Select Analyze Symptoms to see the preliminary report. The report is written in English.","Hold on! That sounds potentially dangerous. Stop driving or testing, and check the safety warning. Get qualified assistance.","You bet. Come back any time.","I didn't catch that. Could you say it another way?","Voice input is unavailable. Please type instead.","Your turn. Tap Talk or type.","Listening...","Mr Car is talking...","Stopped.","Start conversation","Talk","Stop","Read findings","Print notes","Save notes","Send","Type your reply","Voice recognition may use your browser's provider. This is a rule-based guide, not a paid AI model. The full form and report are in English."],
"es-ES":["Español","¡Hola! Soy Mr Car. ¿De qué año, marca y modelo es su vehículo?","Dígame el año, la marca y el modelo. También puede escribirlos en el formulario.","¿Qué problema presenta el auto?","¿Ocurre con el motor frío, caliente o en ambas situaciones?","Al girar la llave, ¿el motor gira normalmente, lentamente o no gira?","¿Qué ha revisado y qué ocurrió?","Gracias. Pulse Analyze Symptoms para ver el informe preliminar en inglés.","¡Alto! Puede ser peligroso. No conduzca ni siga probando. Consulte la advertencia de seguridad y busque un profesional.","Claro. Aquí estaré cuando necesite ayuda.","No entendí bien. ¿Puede repetirlo de otra manera?","No se puede usar el micrófono. Escriba su respuesta.","Su turno. Pulse Hablar o escriba.","Escuchando...","Mr Car está hablando...","Detenido.","Iniciar conversación","Hablar","Detener","Leer resultados","Imprimir notas","Guardar notas","Enviar","Escriba su respuesta","El reconocimiento de voz puede usar servicios del navegador. La guía usa reglas, no una IA de pago. El formulario completo y el informe están en inglés."],
"fr-FR":["Français","Bonjour ! Je suis Mr Car. Quelle est l'année, la marque et le modèle de votre voiture ?","Indiquez l'année, la marque et le modèle, ou remplissez le formulaire.","Quel problème présente votre voiture ?","Le problème survient-il à froid, à chaud ou dans les deux cas ?","Quand vous tournez la clé, le moteur tourne-t-il normalement, lentement ou pas du tout ?","Qu'avez-vous déjà vérifié et qu'avez-vous constaté ?","Merci. Cliquez sur Analyze Symptoms pour obtenir le rapport préliminaire en anglais.","Attention ! Cela peut être dangereux. Ne conduisez pas et arrêtez les essais. Consultez l'avertissement de sécurité et contactez un professionnel.","Avec plaisir. À bientôt.","Je n'ai pas bien compris. Pouvez-vous reformuler ?","Microphone indisponible. Écrivez votre réponse.","À vous. Appuyez sur Parler ou écrivez.","Écoute en cours...","Mr Car parle...","Arrêté.","Démarrer","Parler","Arrêter","Lire le résultat","Imprimer les notes","Enregistrer","Envoyer","Écrivez votre réponse","La reconnaissance vocale peut utiliser un service du navigateur. Guide basé sur des règles, sans IA payante. Le formulaire et le rapport complets restent en anglais."],
"de-DE":["Deutsch","Hallo! Ich bin Mr Car. Welches Baujahr, welche Marke und welches Modell hat Ihr Auto?","Bitte nennen Sie Baujahr, Marke und Modell oder tragen Sie sie ins Formular ein.","Welches Problem macht Ihr Auto?","Tritt das Problem bei kaltem, warmem oder beiden Motorzuständen auf?","Wenn Sie den Schlüssel drehen, dreht der Motor normal, langsam oder gar nicht?","Was haben Sie bereits geprüft und was ist dabei passiert?","Danke. Wählen Sie Analyze Symptoms für den vorläufigen englischen Bericht.","Vorsicht! Das kann gefährlich sein. Fahren oder testen Sie nicht weiter. Beachten Sie die Sicherheitswarnung und wenden Sie sich an Fachpersonal.","Gern. Bis bald.","Ich habe Sie nicht verstanden. Können Sie das anders sagen?","Mikrofon nicht verfügbar. Bitte schreiben Sie Ihre Antwort.","Sie sind dran. Sprechen oder schreiben Sie.","Höre zu...","Mr Car spricht...","Gestoppt.","Gespräch beginnen","Sprechen","Stopp","Ergebnisse vorlesen","Notizen drucken","Notizen speichern","Senden","Antwort schreiben","Spracherkennung kann einen Browserdienst nutzen. Regelbasierte Hilfe ohne kostenpflichtige KI. Das vollständige Formular und der Bericht sind auf Englisch."],
"pt-BR":["Português (Brasil)","Olá! Sou o Mr Car. Qual é o ano, a marca e o modelo do seu carro?","Informe o ano, a marca e o modelo. Você também pode preenchê-los no formulário.","Que problema o carro está apresentando?","O problema acontece com o motor frio, quente ou nas duas situações?","Ao virar a chave, o motor gira normalmente, devagar ou não gira?","O que você já verificou e o que aconteceu?","Obrigado. Clique em Analyze Symptoms para ver o relatório preliminar em inglês.","Atenção! Isso pode ser perigoso. Não dirija nem continue os testes. Veja o aviso de segurança e procure um profissional.","Combinado. Volte quando precisar.","Não entendi. Pode explicar de outra forma?","Microfone indisponível. Digite sua resposta.","Sua vez. Toque em Falar ou digite.","Ouvindo...","Mr Car está falando...","Parado.","Iniciar conversa","Falar","Parar","Ler resultados","Imprimir notas","Salvar notas","Enviar","Digite sua resposta","O reconhecimento de voz pode usar serviços do navegador. Guia baseado em regras, sem IA paga. O formulário e o relatório completos permanecem em inglês."]
};
const LABELS=["language","opening","missing","problem","when","crank","checked","recap","danger","bye","clarify","unavailable","ready","listening","speaking","stopped","start","talk","stop","read","print","save","send","placeholder","info"];
const lines=Object.fromEntries(Object.entries(packs).map(([key,a])=>[key,Object.fromEntries(a.map((v,i)=>[LABELS[i],v]))]));
const panel=el("drCarVoice"), details=panel?.querySelector(".voice-details");
if(!details)return;
const picker=document.createElement("select");picker.id="dcLanguage";picker.setAttribute("aria-label","Conversation language");
for(const [code,dict] of Object.entries(lines))picker.add(new Option(dict.language,code));
const lbl=document.createElement("label");lbl.htmlFor="dcLanguage";lbl.textContent="Conversation language / Idioma / Langue";
details.insertBefore(lbl,details.querySelector('label[for="dcVoiceSelect"]'));details.insertBefore(picker,details.querySelector('label[for="dcVoiceSelect"]'));
const scope=document.createElement("p");scope.id="dcLanguageScope";scope.style.fontSize="12px";details.insertBefore(scope,details.querySelector(".vactions"));
const state={stage:"vehicle",rec:null,voice:null,session:0,history:[],knowledgeWarned:false};
const code=()=>picker.value, dict=()=>lines[code()], setStatus=t=>{if(el("dcStatus"))el("dcStatus").textContent=t};
function log(role,msg){let row=document.createElement("div"),tag=document.createElement("strong");tag.textContent=role+": ";row.append(tag,document.createTextNode(msg));el("dcLog").append(row);el("dcLog").scrollTop=el("dcLog").scrollHeight;state.history.push({role,msg});}
function populateVoices(){
 const choices=(synth?.getVoices()||[]).filter(v=>v.lang&&v.lang.toLowerCase().startsWith(code().slice(0,2)));
 const select=el("dcVoiceSelect"),previous=select.value;
 select.replaceChildren();
 if(!choices.length){select.add(new Option("Browser default / text fallback",""));state.voice=null;return}
 for(const v of choices)select.add(new Option(v.name+" ("+v.lang+")",v.voiceURI));
 const stored=(()=>{try{return localStorage.getItem("drCarVoiceChoice:"+code())}catch(e){return ""}})();
 const preferred=choices.find(v=>v.voiceURI===stored)||choices.find(v=>v.voiceURI===previous)||(code()==="en-US"?choices.find(v=>/\b(David|Guy|Mark|Andrew|Brian|Eric)\b/i.test(v.name)):null)||choices[0];
 select.value=preferred.voiceURI;state.voice=preferred;
}
function stop(){state.session++;if(state.rec){try{state.rec.abort()}catch(e){}state.rec=null}if(synth)synth.cancel()}
function speak(msg){if(!synth)return;let sid=++state.session;let u=new SpeechSynthesisUtterance(msg);u.lang=code();u.rate=.88;u.pitch=.9;let v=(synth.getVoices()||[]).find(v=>v.voiceURI===el("dcVoiceSelect").value);if(v)u.voice=v;u.onstart=()=>setStatus(dict().speaking);u.onend=()=>{if(sid===state.session)setStatus(dict().ready)};u.onerror=()=>setStatus(dict().ready);synth.cancel();synth.speak(u)}
function say(t){log("Mr Car",t);speak(t)}
const hazards=[
 /\b(fuel leak|gas leak|leaking gas|raw fuel smell|strong gas smell|fire|flames|smoke|brakes failed|no brakes|steering failure|no oil pressure|zero oil pressure|severe overheating|electrical sparks)\b/i,
 /\b(fuga de gasolina|fuga de combustible|olor fuerte a gasolina|incendio|humo|sin frenos|fallan los frenos|sin dirección|sin presión de aceite|sobrecalentamiento grave)\b/i,
 /\b(fuite d'essence|fuite de carburant|odeur forte d'essence|incendie|fumée|plus de freins|sans freins|perte de direction|plus de pression d'huile|surchauffe grave)\b/i,
 /\b(benzinleck|kraftstoffleck|benzin läuft aus|feuer|rauch|bremsen versagen|keine bremsen|lenkung ausgefallen|kein öldruck|starke überhitzung)\b/i,
 /\b(vazamento de gasolina|vazamento de combustível|cheiro forte de gasolina|incêndio|fumaça|sem freios|freios falharam|perda da direção|sem pressão do óleo|superaquecimento grave)\b/i
];
const common=[
 {re:/\b(no start|won't start|does not start|doesn't start|doesn't fire|won't fire|no enciende|no arranca|não liga|não pega|ne démarre pas|startet nicht|springt nicht an)\b/i,out:"Engine does not start"},
 {re:/\b(cranks slowly|slow crank|gira lento|gira lentamente|démarre lentement|dreht langsam|gira devagar)\b/i,out:"Slow cranking"},
 {re:/\b(overheats|overheating|se calienta|sobrecalienta|surchauffe|überhitzt|superaquece)\b/i,out:"Engine overheating"},
 {re:/\b(fuel smell|smell of gasoline|olor a gasolina|odeur d'essence|benzin geruch|cheiro de gasolina)\b/i,out:"Fuel smell"}
];
function localizeSymptom(t){for(const entry of common)if(entry.re.test(t))return entry.out;return code()==="en-US"?t:""}
function autoflag(){
 const d=typeof getData==="function"?getData():null;
 if(d && typeof detectTextSafety==="function")detectTextSafety(d);
}
function setField(id,value){let f=el(id);if(f){f.value=value;f.dispatchEvent(new Event("change",{bubbles:true}))}}
function recognizeVehicle(t){
 const y=t.match(/\b(?:19|20)\d{2}\b/);if(y)setField("year",y[0]);
 const makes=["Rolls-Royce","Pontiac","Chevrolet","Oldsmobile","Ford","Dodge","Plymouth","Buick","Cadillac","Chrysler","Mercedes-Benz","Volkswagen","Jeep","Toyota","Honda","BMW","Packard"];
 let make=makes.find(m=>t.toLowerCase().includes(m.toLowerCase()));if(make)setField("make",make);
 let cleaned=t.replace(/\b(?:19|20)\d{2}\b/g,"");
 if(make)cleaned=cleaned.replace(new RegExp(make.replace("-","[- ]"),"i"),"");
 cleaned=cleaned.replace(/\b(my|a|an|the|is|it's|i have|tengo|es|un|una|mon|ma|une|mein|meine|um|uma|meu|minha|car|auto|voiture|coche|carro|wagen|auto)\b/gi,"").replace(/[.,!?]/g,"").trim();
 if(cleaned && cleaned.length<75)setField("model",cleaned);
 return Boolean(el("year")?.value&&el("make")?.value&&el("model")?.value);
}
function parseTime(t){
 const low=t.toLowerCase();let values=[];
 if(/\b(hot|warm|caliente|chaud|chaude|heiß|heiss|quente)\b/i.test(low))values.push("hot restart");
 if(/\b(cold|frío|fria|froid|froide|kalt|frio)\b/i.test(low))values.push("cold start");
 for(const v of values){let cb=[...document.querySelectorAll("#whenChecks input")].find(x=>x.value===v);if(cb)cb.checked=true}
 return values.length>0;
}
function process(raw){
 const t=raw.trim();if(!t)return;stop();log("You",t);el("dcText").value="";
 if(hazards.some(re=>re.test(t))){
  state.stage="unsafe";
  if(el("symptoms"))el("symptoms").value+=(" "+t);
  const flags=[...document.querySelectorAll(".redflag")];
  const hazardTerms=[
   ["fuel leak",/fuel|gasolina|combustible|essence|benzin|kraftstoff|gas smell/i],
   ["brake",/brake|frenos|freins|bremsen|freios/i],
   ["steering",/steering|dirección|direction|lenkung|direção/i],
   ["overheating",/overheat|sobrecalent|surchauff|überhitz|superaquec/i],
   ["oil pressure",/oil pressure|presión de aceite|pression d'huile|öldruck|pressão do óleo/i],
   ["electrical",/electrical|sparks|wiring|fiação|électrique|elektrisch/i]
  ];
  const found=hazardTerms.find(([label,re])=>re.test(t));
  const box=flags.find(x=>x.value.toLowerCase().includes(found?found[0]:"electrical"));
  if(box)box.checked=true;
  if(typeof doAnalyze==="function"){try{doAnalyze()}catch(e){}}
  say(dict().danger);return
 }
 if(state.stage==="unsafe"){say(dict().danger);return}
 if(state.stage==="vehicle"){
  if(!recognizeVehicle(t)){say(dict().missingVehicle);return}
  state.stage="problem";say(dict().problem);return
 }
 if(state.stage==="problem"){
  const symptom=localizeSymptom(t);
  if(!symptom){say(dict().clarify+" "+dict().recap);state.stage="manual";return}
  setField("symptoms",[el("symptoms").value,symptom].filter(Boolean).join(". "));
  state.stage="timing";say(dict().when);return
 }
 if(state.stage==="timing"){
  parseTime(t);
  state.stage="check";
  const symptom=el("symptoms").value.toLowerCase();
  say(symptom.includes("start")||symptom.includes("crank")?dict().crank:dict().checked);return
 }
 if(state.stage==="check"){
  if(code()==="en-US")setField("followup",t);
  state.stage="manual";say(dict().recap);return
 }
 say(dict().recap)
}
function listen(){
 if(!Speech){setStatus(dict().unavailable);return}
 stop();let rec=new Speech();state.rec=rec;rec.lang=code();rec.interimResults=false;rec.maxAlternatives=1;
 rec.onstart=()=>setStatus(dict().listening);
 rec.onresult=e=>{if(state.rec!==rec)return;state.rec=null;process(e.results?.[0]?.[0]?.transcript||"")};
 rec.onerror=()=>{if(state.rec===rec){state.rec=null;setStatus(dict().unavailable)}};
 rec.onend=()=>{if(state.rec===rec){state.rec=null;setStatus(dict().ready)}};
 try{rec.start()}catch(e){state.rec=null;setStatus(dict().unavailable)}
}
function updateUI(){
 document.documentElement.lang=code().slice(0,2);
 const p=dict();
 const ids=[["dcStart","start"],["dcListen","talk"],["dcStop","stop"],["dcRead","read"],["dcPrint","print"],["dcSave","save"],["dcSend","send"]];
 for(const [id,key] of ids){const b=el(id);if(b)b.textContent=p[key]}
 el("dcText").placeholder=p.placeholder;
 scope.textContent=p.info;
 populateVoices();
 setStatus(p.ready);
}
picker.addEventListener("change",()=>{
 stop();state.stage="vehicle";el("dcLog").replaceChildren();state.history=[];
 try{localStorage.setItem("drCarLanguage",code())}catch(e){}
 updateUI()
});
el("dcVoiceSelect").addEventListener("change",()=>{try{localStorage.setItem("drCarVoiceChoice:"+code(),el("dcVoiceSelect").value)}catch(e){}});
el("dcStart").onclick=()=>{stop();state.stage="vehicle";el("dcLog").replaceChildren();state.history=[];say(dict().intro)};
el("dcListen").onclick=listen;
el("dcStop").onclick=()=>{stop();setStatus(dict().stopped)};
el("dcSend").onclick=()=>process(el("dcText").value);
el("dcText").onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();process(el("dcText").value)}};
el("dcRead").onclick=()=>{
 const t=el("hardStop")?.classList.contains("on")?el("hardStop").innerText:el("report")?.textContent?.trim();
 if(!t){setStatus(dict().recap);return}
 if(code()!=="en-US"){say(dict().recap);return}
 speak(t.slice(0,1800))
};
el("dcJumpVoice")?.addEventListener("click",()=>{el("drCarVoice")?.classList.remove("minimized")});
if(synth)synth.addEventListener?.("voiceschanged",populateVoices);
try{const prev=localStorage.getItem("drCarLanguage");if(packs[prev])picker.value=prev}catch(e){}
updateUI();
})();
