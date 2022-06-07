System.register(["./application.js"], function (_export, _context) {
  "use strict";

  var createApplication;
  var ccjs;
  let canvas = null;
 let container = null;
  //当切换标签后，需要给container重新设置Parent
 
  function loadJsListFile(url) {
    return new Promise(function (resolve, reject) {
      var err;
      console.log("loadJsListFile url=====" + url);
      function windowErrorListener(evt) {
        if (evt.filename === url) {
          err = evt.error;
        }
      }

      window.addEventListener('error', windowErrorListener);
      var script = document.createElement('script');
     // script.charset = 'utf-8';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.addEventListener('error', function () {
        window.removeEventListener('error', windowErrorListener);
        reject(Error('Error loading ' + url));
      });
      script.addEventListener('load', function () {
        window.removeEventListener('error', windowErrorListener);
        document.head.removeChild(script); // Note that if an error occurs that isn't caught by this if statement,
        // that getRegister will return null and a "did not instantiate" error will be thrown.

        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      script.src = url;
      document.head.appendChild(script);
    });
  }
 
  function fetchWasm(url) {
    
    return fetch(url).then(function (response) {
      return response.arrayBuffer();
    });
  }


  function canvasName()
  {
    return 'GameCanvas';
  }
  function findCanvas() {
    canvas = document.getElementById('GameCanvas');
    if (!canvas || canvas.tagName !== 'CANVAS') {
      canvas = document.createElement('canvas');
      console.log("Cannot find canvas(#GameCanvas) create one");
    }
    canvas.id ="GameCanvas";
    let gameSceneDiv = document.getElementById("gameScene");
   
    gameSceneDiv.appendChild(canvas);
    container = document.createElement('div');
    
    if (canvas && canvas.parentNode) {
      canvas.parentNode.insertBefore(container, canvas);
    }
    container.setAttribute('id', 'Cocos3dGameContainer');
    container.appendChild(canvas);
    
    var frame = container.parentNode === document.body ? document.documentElement : container.parentNode;
    return {
      frame: frame,
      canvas: canvas,
      container: container
    };
  }
  
  function sceneName(cc)
  {
    ccjs = cc;
    window._CCSettings = undefined;
    showScene("main");
   
  }
  function getSceneParent()
  {
   return document.getElementById("gameScene");
  }
  function showScene(sceneName)
  {
    setTimeout(() => {
    cc.director.loadScene( "assets/Scene/"+sceneName +".scene",  function () {
            console.log("vue Success to load scene: ".concat(sceneName));
      });
    },1000);
   
  }

  function showSaveMainScene()
  {
    setTimeout(() => {
    let parentDiv = getSceneParent();
    parentDiv.appendChild(container);//container保存的是之前的场景，因为不能每次都创建
     },1000);
   
  }
  
 
 
  _export("index", ccjs);
  return {
    setters: [function (_applicationJs) {
      createApplication = _applicationJs.createApplication;
    }],
    execute: function () {
     document.body.addEventListener('ShowSaveMainScene',()=>{
          console.log('vue receive ShowGameScene--------------');
          showSaveMainScene();
      });
    createApplication({
        loadJsListFile: loadJsListFile,
        fetchWasm: fetchWasm,
        sceneName:sceneName
       }).then(function (application) {
        // setTimeout(() => {
           document.body.addEventListener('ShowMainScene',()=>{
            // console.log("vue addevent firstShowMainScene-------------------");
            return application.start({
              findCanvas: findCanvas,
              canvasName:canvasName
            });
         //  },5000);
           })
         
        
      })["catch"](function (err) {
        console.error(err);
      }
      
      );
    }
  };
});