import './style.css';
import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { stages, nodes, documents, excerpt } from './content.js';
const $=s=>document.querySelector(s),colors=['#ef8763','#51a7b5','#edbc4e','#8296d3','#97b874'];
let current=null,shown=stages,renderer,camera,scene,controls,city,clouds,buildings=[],labels=[],paused=matchMedia('(prefers-reduced-motion: reduce)').matches,time=0,last=performance.now(),frame;
function button(text,action){const b=document.createElement('button');b.textContent=text;b.onclick=action;return b;}
function colorFor(node){let n=node;while(n.parent)n=n.parent;return colors[Math.max(0,stages.indexOf(n))%colors.length];}
function navigate(n){history.pushState(null,'',n?'#'+encodeURIComponent(n.key):location.pathname);render(n);}
function documentView(path){$('#document-path').textContent=path;$('#document-text').textContent=documents[path];$('#document').showModal();}
$('#close-document').onclick=()=>$('#document').close();
stages.forEach(n=>{const b=button('',()=>navigate(n));b.style.setProperty('--color',colorFor(n));const id=document.createElement('b');id.textContent=n.id;const name=document.createElement('span');name.textContent=n.title;b.append(id,name);$('#districts').append(b);});
function syncMotion(){$('#motion').textContent=paused?'Resume clouds':'Pause clouds';$('#motion').setAttribute('aria-pressed',String(paused));}$('#motion').onclick=()=>{paused=!paused;syncMotion();};syncMotion();
function resetCamera(){if(!camera)return;camera.zoom=1;camera.updateProjectionMatrix();camera.position.set(16,18,23);controls.target.set(0,0,0);controls.update();}$('#reset').onclick=resetCamera;
function material(color){return new T.MeshStandardMaterial({color,roughness:1});}
function mesh(geo,mat,x,y,z,parent=city){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function buildScene(){
 if(!renderer)return;
 if(city){scene.remove(city);city.traverse(o=>{o.geometry?.dispose();if(o.material)Array.isArray(o.material)?o.material.forEach(m=>m.dispose()):o.material.dispose();});}
 city=new T.Group();scene.add(city);buildings=[];
 mesh(new T.BoxGeometry(23,.55,16),material('#b4ce95'),0,-.5,0);
 mesh(new T.BoxGeometry(22,.03,1.4),material('#e9dec8'),0,-.205,0);
 mesh(new T.BoxGeometry(1.3,.03,15),material('#e9dec8'),0,-.19,0);
 for(let i=-10;i<=10;i+=2)mesh(new T.BoxGeometry(.7,.035,.06),material('#fff5df'),i,-.17,0);
 const cols=Math.min(shown.length,3),rows=Math.ceil(shown.length/cols);
 shown.forEach((n,i)=>{
  const x=(i%cols-(cols-1)/2)*7,z=(Math.floor(i/cols)-(rows-1)/2)*6;
  const group=new T.Group();group.position.set(x,0,z);city.add(group);
  mesh(new T.CylinderGeometry(2.5,2.5,.15,32),material('#d6dfa9'),0,-.13,0,group);
  const height=1.5+(i%3)*.6,color=colorFor(n),isTower=i%3===1;
  const main=mesh(isTower?new T.CylinderGeometry(.9,.9,height,12):new T.BoxGeometry(1.8,height,1.7),material(color),0,height/2,0,group);main.userData.node=n;buildings.push(main);
  const roof=mesh(new T.ConeGeometry(isTower?1.05:1.5,.7,isTower?12:4),material('#f6f0d8'),0,height+.35,0,group);roof.rotation.y=Math.PI/4;roof.userData.node=n;buildings.push(roof);
  for(let row=0;row<2;row++)for(let col=-1;col<=1;col+=2)mesh(new T.BoxGeometry(.28,.35,.035),material('#fff5d8'),col*.43,.6+row*.7,.87,group);
  mesh(new T.BoxGeometry(.37,.66,.045),material('#486e86'),0,.32,.88,group);
  mesh(new T.BoxGeometry(.04,1,.04),material('#536c60'),1.2,2.3,0,group);mesh(new T.BoxGeometry(.55,.28,.04),material(color),1.48,2.55,0,group);
  // Satellite houses and trees are illustrative district scenery.
  mesh(new T.BoxGeometry(.7,.65,.8),material('#ead5b8'),-1.5,.3,.6,group);const smallRoof=mesh(new T.ConeGeometry(.65,.45,4),material(color),-1.5,.84,.6,group);smallRoof.rotation.y=Math.PI/4;
  for(const [tx,tz]of [[1.7,1.1],[-1.2,-1.5]]){mesh(new T.CylinderGeometry(.08,.1,.65,6),material('#988778'),tx,.3,tz,group);mesh(new T.IcosahedronGeometry(.5,1),material('#6ba887'),tx,.95,tz,group);}
  group.userData.label=new T.Vector3(x,0,z+2.2);
 });
 resetCamera();resize();
}
function render(node){current=node;shown=node?(node.children.length?node.children:[node]):stages;document.body.classList.toggle('focused',!!node);$('#detail').hidden=!node;
 const trail=[];for(let n=node;n;n=n.parent)trail.unshift(n);$('#trail').replaceChildren(button('Whole city',()=>navigate(null)),...trail.map(n=>button('/ '+n.id,()=>navigate(n))));
 if(node){$('#title').textContent=node.title;$('#summary').textContent=excerpt(node);$('#kind').textContent=node.proposed?'PROPOSED SUBDIVISION':node.children.length?`${node.children.length} PLACES TO EXPLORE`:'AT THE SOURCE';$('#children').replaceChildren(...node.children.map(n=>button(n.id+' · '+n.title+(n.proposed?' ◇':''),()=>navigate(n))));$('#source').onclick=()=>documentView(node.sourcePath);$('#contract').hidden=node.path===node.sourcePath;$('#contract').onclick=()=>documentView(node.path);}
 $('#labels').replaceChildren();labels=shown.map(n=>{const b=button('',()=>n===current&&!n.children.length?documentView(n.sourcePath):navigate(n));b.className='label';b.style.setProperty('--color',colorFor(n));b.setAttribute('aria-label',n.id+'. '+n.title+(n.proposed?' (proposed)':''));const id=document.createElement('b');id.textContent=n.id;const title=document.createElement('span');title.textContent=n.title+(n.proposed?' ◇':'');b.append(id,title);$('#labels').append(b);return b;});buildScene();
 if(!renderer){$('#labels').style.display='flex';$('#labels').style.flexWrap='wrap';labels.forEach(b=>{b.style.position='static';b.style.transform='none';});}
}
function resize(){if(!renderer)return;const {width,height}=$('#viewport').getBoundingClientRect(),aspect=width/height;const size=Math.max(11,15/aspect);camera.left=-size*aspect;camera.right=size*aspect;camera.top=size;camera.bottom=-size;camera.updateProjectionMatrix();renderer.setSize(width,height);}
try{
 renderer=new T.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;$('#viewport').prepend(renderer.domElement);
 scene=new T.Scene();camera=new T.OrthographicCamera(-16,16,11,-11,.1,100);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minZoom=.5;controls.maxZoom=2.5;controls.maxPolarAngle=Math.PI*.44;controls.minPolarAngle=.15;
 scene.add(new T.HemisphereLight(0xffffff,0x95a593,2.5));const sun=new T.DirectionalLight(0xfff8df,3);sun.position.set(-8,16,12);sun.castShadow=true;Object.assign(sun.shadow.camera,{left:-18,right:18,top:18,bottom:-18,near:1,far:60});sun.shadow.mapSize.set(2048,2048);sun.shadow.normalBias=.04;scene.add(sun);
 clouds=new T.Group();scene.add(clouds);for(let i=0;i<5;i++)for(let j=0;j<3;j++){const c=mesh(new T.SphereGeometry(.65+j*.12,12,8),material('#f5fbf8'),(i-2)*6+j*.7,5+Math.sin(i)*.6,-7-i%2*2,clouds);c.scale.y=.55;}
 new ResizeObserver(resize).observe($('#viewport'));let down;
 renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY];});renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const rect=renderer.domElement.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);const hit=ray.intersectObjects(buildings)[0];if(hit){const n=hit.object.userData.node;n===current&&!n.children.length?documentView(n.sourcePath):navigate(n);}});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);$('#error').textContent='3D was interrupted. Reload to restore the city; chapter navigation remains available.';});
}catch{renderer=null;$('#error').textContent='3D is unavailable. Explore the chapters with the buttons below.';}
function animate(now){const dt=Math.min((now-last)/1000,.05);last=now;if(!paused)time+=dt;clouds.position.x=Math.sin(time*.12)*1.2;controls.update();renderer.render(scene,camera);const rect=$('#viewport').getBoundingClientRect();const groups=city.children.filter(g=>g.userData.label);groups.forEach((g,i)=>{const p=g.userData.label.clone().project(camera);labels[i].style.left=`${(p.x+1)*rect.width/2}px`;labels[i].style.top=`${(1-p.y)*rect.height/2}px`;labels[i].style.visibility=p.z>1?'hidden':'visible';});frame=requestAnimationFrame(animate);}
function fromURL(){let key='';try{key=decodeURIComponent(location.hash.slice(1));}catch{}render(nodes.get(key)||null);}window.addEventListener('popstate',fromURL);window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#document').open&&current)navigate(current.parent);});
if(import.meta.env.PROD){$('.home').href='#';$('.home').textContent='← Whole city';$('.home').onclick=()=>navigate(null);}
fromURL();if(renderer)frame=requestAnimationFrame(animate);
