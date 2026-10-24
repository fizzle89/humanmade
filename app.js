(function(){
var PRO = !!window.HM_PRO;
var $ = function(id){return document.getElementById(id)};
function hex(buf){return Array.prototype.map.call(new Uint8Array(buf),function(b){return b.toString(16).padStart(2,'0')}).join('')}
async function sha(buf){return hex(await crypto.subtle.digest('SHA-256',buf))}
function canon(o){return JSON.stringify(o,Object.keys(o).sort())}
async function fileHash(f){return sha(await f.arrayBuffer())}
var files=[];
$('drop').addEventListener('change',function(e){files=[].slice.call(e.target.files);if(!PRO)files=files.slice(0,1);$('fl').textContent=files.map(function(f){return f.name}).join(', ')||'No file chosen'});
$('make').addEventListener('click',async function(){
  var who=$('who').value.trim(), decl=$('decl').value;
  if(!files.length||!who){alert('Choose a file and enter the creator name.');return}
  if(!$('ack').checked){alert('Tick the declaration box. The certificate records your statement.');return}
  var out=[];
  for(var f of files){
    var c={version:'1',type:'hm-declaration',file_name:f.name,file_bytes:f.size,file_sha256:await fileHash(f),creator:who,work_title:$('title').value.trim(),
      declaration:decl,tools_disclosed:$('tools').value.trim()||'none stated',issued_at:new Date().toISOString(),tier:PRO?'pro':'free-sample'};
    c.certificate_id=(await sha(new TextEncoder().encode(canon(c)))).slice(0,16);
    c.seal_sha256=await sha(new TextEncoder().encode(canon(c)));
    out.push(c);
  }
  window.__certs=out;
  $('result').hidden=false;
  $('certs').innerHTML='';
  out.forEach(function(c,i){
    var d=document.createElement('div');d.className='cert';
    d.innerHTML='<h3>'+(PRO?'Human-made declaration':'Human-made declaration (FREE SAMPLE)')+'</h3><p><b>'+esc(c.file_name)+'</b><br>SHA-256: <code>'+c.file_sha256+'</code></p><p>Creator: '+esc(c.creator)+'<br>Issued: '+c.issued_at+'<br>ID: <code>'+c.certificate_id+'</code></p><p class="small">'+esc(c.declaration)+'</p><button data-i="'+i+'">Download certificate (.json)</button> <button data-p="'+i+'">Print / save PDF</button> <button data-b="'+i+'">Copy badge code</button>';
    $('certs').appendChild(d)});
});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
$('certs').addEventListener('click',function(e){
  var t=e.target,c;
  if(t.dataset.i!==undefined){c=window.__certs[t.dataset.i];var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(c,null,2)],{type:'application/json'}));a.download='humanmade-'+c.certificate_id+'.json';a.click()}
  if(t.dataset.p!==undefined){var cd=t.parentNode.cloneNode(true);var w=window.open('');w.document.write('<title>Certificate</title><body style="font-family:Georgia;max-width:640px;margin:40px auto">'+cd.innerHTML.replace(/<button.*$/,'')+'<hr><p style="font-size:12px">Seal: '+window.__certs[t.dataset.p].seal_sha256+'<br>Verify at the Human-made verify page by dropping the file and this certificate JSON. This is a creator declaration with a file fingerprint and timestamp, not independent proof of authorship.</p></body>');w.document.close();w.print()}
  if(t.dataset.b!==undefined){c=window.__certs[t.dataset.b];var code='<a href="'+location.origin+location.pathname.replace(/[^\/]*$/,'')+'verify.html?id='+c.certificate_id+'" rel="noopener">Human-made declaration '+c.certificate_id+'</a>';navigator.clipboard.writeText(code);t.textContent='Copied'}
});
var vg=$("vgo");if(vg)vg.addEventListener('click',async function(){
  var f=$('vfile').files[0],j;
  try{j=JSON.parse($('vjson').value)}catch(e){$('vres').textContent='Certificate JSON is not valid.';return}
  if(!f){$('vres').textContent='Choose the file.';return}
  var seal=j.seal_sha256;delete j.seal_sha256;
  var okSeal=(await sha(new TextEncoder().encode(canon(j))))===seal;
  var okFile=(await fileHash(f))===j.file_sha256;
  $('vres').innerHTML=(okSeal?'Certificate fields are intact. ':'<b>Certificate was edited after issue.</b> ')+(okFile?'File matches the fingerprint.':'<b>File does not match the fingerprint.</b>')+'<br>Reminder: this confirms nothing changed since '+esc(j.issued_at||'?')+'. It does not independently prove who made the work.';
});
})();
