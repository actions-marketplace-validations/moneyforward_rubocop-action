module.exports=function(e,t){"use strict";var n={};function __webpack_require__(t){if(n[t]){return n[t].exports}var r=n[t]={i:t,l:false,exports:{}};e[t].call(r.exports,r,r.exports,__webpack_require__);r.l=true;return r.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(104)}return startup()}({58:function(e){e.exports=require("readline")},87:function(e){e.exports=require("os")},104:function(e,t,n){const r=n(413);const{analyzeCodeStatically:s,tool:{installGem:o,LineTransformStream:c}}=n(391);(async()=>{process.exitCode|=await s("rubocop",["--format","emacs","-P"],undefined,(()=>{const e={R:"Refactor",C:"Convention",W:"Warning",E:"Error",F:"Fatal"};const t=[new c,new r.Transform({readableObjectMode:true,writableObjectMode:true,transform:function(t,n,r){const s=/^(.+):(\d+):(\d+): (R|C|W|E|F): (.+): (.*)$/;const[o,c,i,u,a,l,f]=s.exec(t)||[];r(null,o?{file:c,line:i,column:u,severity:/(E|F)/.test(a)?"error":"warning",message:`[${e[a]}] ${l}: ${f}`,code:l}:undefined)}})];t.reduce((e,t)=>e.pipe(t));return t})(),o(false,"rubocop"),2)})().catch(e=>{console.log(`::error::${String(e)}`);process.exit(1)})},129:function(e){e.exports=require("child_process")},304:function(e){e.exports=require("string_decoder")},345:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const s=n(129);const o=r(n(747));const c=r(n(87));const i=r(n(622));const u=r(n(58));const a=r(n(413));const l=n(304);t.execute=((e,t=[],n={},r=1,o)=>{return new Promise((c,i)=>{let u;const a=s.spawn(e,t,n).once("error",i).once("exit",e=>u=e);a.stdout&&a.stdout.pipe(process.stdout);a.stderr&&a.stderr.pipe(process.stderr);const l=o?o(a):Promise.resolve(undefined);const f=async e=>e===null||e>=r?i(e):c(await l);if(u!==undefined)f(u);a.once("exit",f)})});t.stringify=(async e=>{const t=[];for await(const n of e)t.push(n);return Buffer.concat(t).toString().trim()});t.substitute=((e,n=[],r,o)=>new Promise((c,i)=>{const u=s.spawn(e,n,Object.assign({},r,{stdio:[o,"pipe","ignore"]})).once("error",i);if(u.stdout===null)return c("");t.stringify(u.stdout).then(c).catch(i)}));t.installGem=(async(e=true,...n)=>(async()=>{console.log(`::group::Installing gems...`)})().then(async()=>{return await Promise.all([(async()=>{const r=await(async(...t)=>{const n=new Map(t.map(e=>[e,undefined]));const r="Gemfile.lock";if(!o.default.existsSync(r))return n;const s=new RegExp(`^ {4}(${t.map(t=>e?t:t+"\\b[\\w-]*").join("|")}) \\((.*)\\)$`);for await(const e of u.default.createInterface(o.default.createReadStream(r))){const[t,r,o]=s.exec(e)||[];if(t)n.set(r,o)}return n})(...n);await(async(e,...n)=>{const r=["install"].concat(n);for(const[t,n]of e)r.push(`${t}${n&&":"+n||""}`);return t.execute("gem",r)})(r,"-N","--user-install");return r})(),(async()=>{const e=await t.substitute("gem",["environment","gempath"]);const n=(e?e.split(i.default.delimiter):[]).map(e=>i.default.join(e,"bin"));process.env["PATH"]=n.concat(process.env.PATH||"").join(i.default.delimiter)})()]).then(([e])=>e)}).finally(()=>console.log(`::endgroup::`)));class LineTransformStream extends a.default.Transform{constructor(e){super({writableObjectMode:true});this.decoder=new l.StringDecoder(e);this.buffer=""}_transform(e,t,n){try{const t=this.decoder.write(e);const r=(this.buffer+t).split(c.default.EOL);const s=r.pop();for(const e of r)this.push(e);this.buffer=s||"";n()}catch(e){n(e)}}_flush(e){try{const t=this.decoder.end();const n=(this.buffer+t).split(c.default.EOL);const r=n.pop();for(const e of n)this.push(e);if(r&&r.length)this.push(r);e()}catch(t){e(t)}}}t.LineTransformStream=LineTransformStream},357:function(e){e.exports=require("assert")},391:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=n(357);const c=r(n(747));const i=r(n(87));const u=r(n(622));const a=r(n(58));const l=r(n(413));const f=s(n(345));t.tool=f;const d=async(e,t)=>{const n="git";const r=await f.execute(n,["remote","-v"],undefined,undefined,async e=>{o.strict(e.stdout!==null);if(e.stdout==null)return"";e.stdout.unpipe(process.stdout);const t=[];for await(const n of a.default.createInterface(e.stdout))if(/\bgithub\.com\b/.test(n)&&/ \(fetch\)$/.test(n))t.push(n);return t.map(e=>e.split("\t",1)[0])[0]});const s=await[e,t].map(e=>()=>f.execute(n,["rev-parse","--verify","-q",e],undefined,undefined,async e=>{o.strict(e.stdout!==null);if(e.stdout==null)return;e.stdout.unpipe(process.stdout);return f.stringify(e.stdout)}).catch(async()=>{await f.execute(n,["fetch","--depth=1","-q",r,e]);return f.execute(n,["rev-parse","--verify","-q",`${r}/${e}`],undefined,undefined,async e=>{o.strict(e.stdout!==null);if(e.stdout==null)return;e.stdout.unpipe(process.stdout);return f.stringify(e.stdout)})}).then(e=>(e||"").trim())).reduce((e,t)=>e.then(async e=>e.concat(await t())),Promise.resolve([]));const c=["--no-pager","diff","--no-prefix","--no-color","-U0","--diff-filter=b",s.join("...")];return f.execute(n,c,undefined,undefined,async e=>{const t=new Map;o.strict(e.stdout!==null);if(e.stdout==null)return t;e.stdout.unpipe(process.stdout);const n=[];for await(const t of a.default.createInterface(e.stdout))/^([@]{2}|[+]{3})\s/.test(t)&&n.push(t);let r="";for(const e of n){if(/^[+]{3}\s/.test(e)){r=e.substring("+++ ".length);continue}const n=((/^@@ (.*) @@.*$/.exec(e)||[])[1]||"").split(" ");const[s,o=1]=n[n.length-1].split(",").map(Number).map(Math.abs);t.set(r,(t.get(r)||[]).concat([[s,s+o-1]]))}return t})};t.analyzeCodeStatically=(async(e,t=[],n={},r=[],s=Promise.resolve(),a=1)=>{await s;console.log(`::group::Analyze code statically using ${e}`);return f.execute(e,t,n,a,e=>new Promise((t,n)=>{o.strict(e.stdout!==null);e.stdout&&e.stdout.unpipe(process.stdout);const[s=new l.default.PassThrough,a=s]=r.map(e=>e.once("error",n));e.stdout&&e.stdout.pipe(s);o.strict(process.env.GITHUB_BASE_REF,"Environment variable `GITHUB_BASE_REF` is undefined.");o.strict(process.env.GITHUB_HEAD_REF,"Environment variable `GITHUB_HEAD_REF` is undefined.");d(process.env.GITHUB_BASE_REF||"",process.env.GITHUB_HEAD_REF||"").then(e=>{a.pipe((()=>{const n={problemMatcher:[{owner:"analyze-result.tsv",pattern:[{regexp:"^\\[([^\\t]+)\\] Detected `([^\\t]+)` problem at line (\\d+), column (\\d+) of ([^\\t]+)\\t([^\\t]+)$",file:5,line:3,column:4,severity:1,message:6,code:2}]}]};let r=0;let s=false;return new l.default.Writable({objectMode:true,write:function(t,o,a){if(!s){const e=u.default.join(c.default.mkdtempSync(u.default.join(i.default.tmpdir(),`-`)),"problem-matcher.json");c.default.writeFileSync(e,JSON.stringify(n));console.log(`::add-matcher::${e}`);s=true}const l=u.default.relative(process.cwd(),t.file);const f=Number(t.line);const d=e.get(l)||[];for(const[e,n]of d)if(f>=e&&f<=n){const e=[t.severity,t.code,f,Number(t.column),l,t.message].map(e=>typeof e==="number"?e:(e===undefined?"":String(e)).replace(/\s+/g," "));console.log(`[%s] Detected \`%s\` problem at line %d, column %d of %s\t%s`,...e);r+=1;break}a()},final:function(e){console.log("::remove-matcher owner=analyze-result.tsv::");if(r>0){console.log(`Detected ${r} issue(s).`)}e();t(r>0?1:0)}})})()).once("error",n)})})).finally(()=>console.log(`::endgroup::`))})},413:function(e){e.exports=require("stream")},622:function(e){e.exports=require("path")},747:function(e){e.exports=require("fs")}});