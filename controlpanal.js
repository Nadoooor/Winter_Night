AFRAME.registerComponent('call', {
    init: function () {
        console.log('call component has been initialized');
        window.addEventListener('keydown', (e) => {
            const controlpanal = document.querySelector('#controlpanal');
            const camera = document.querySelector('#camera');
            var campos = new THREE.Vector3();
            camera.object3D.getWorldPosition(campos);
            var camrot = new THREE.Quaternion();
            camera.object3D.getWorldQuaternion(camrot);
            var camdir = new THREE.Vector3();
            camera.object3D.getWorldDirection(camdir);
            campos.add(camdir.multiplyScalar(-5));
            if (e.key === 'T' || e.key === 't') {
                console.log('T pressed');
                var panalTrans = new Ammo.btTransform();
                panalTrans.setIdentity();
                panalTrans.setOrigin(new Ammo.btVector3(campos.x, campos.y, campos.z));
                panalTrans.setRotation(new Ammo.btQuaternion(camrot.x, camrot.y, camrot.z, camrot.w));
                controlpanal.body.setWorldTransform(panalTrans);
                controlpanal.body.activate();

            };
        });
    },

});


AFRAME.registerComponent('light+', {

    init: function () {
      
        this.el.addEventListener('click', () => {
            const light = document.querySelector('#Light');
            var intensty = light.getAttribute('light').intensity;
            intensty += 0.5;
            light.setAttribute('light', 'intensity', intensty);
            console.log('Light intensity increased to ' + intensty);
        });

    },

});


AFRAME.registerComponent('light-', {

    init: function () {
        console.log('loaded');
        this.el.addEventListener('click', () => {
            console.log ('clicked');
            const light = document.querySelector('#Light');
            var intensity = light.getAttribute('light').intensity;
            intensity -= 0.5;
            if (intensity < 0) {
                intensity = 0;
            }
            light.setAttribute('light', 'intensity', intensity);
            console.log('Light intensity decreased to ' + intensity);
        });
    },});


AFRAME.registerComponent('flashlight', {

    init: function () {
        var bool = true;
        this.el.addEventListener('click', () => {
            
            const cameraLight = document.querySelector('#flash');
            if (bool) {
                cameraLight.setAttribute('light', 'intensity', 3);
                console.log('Flashlight ON');
                bool = false;
            } else {
                cameraLight.setAttribute('light', 'intensity', 0);
                console.log('Flashlight OFF');
                bool = true;
            }
        });
    },
});


AFRAME.registerComponent('music+', {

    init: function () {
        this.el.addEventListener('click', () => {
            const music = document.querySelector('#music');
            music.volume += 0.1;
        
            console.log('Music volume increased to ' + music.volume);
        });
    },});

AFRAME.registerComponent('music-', {
    init: function (){
        this.el.addEventListener('click', () => {
            const music = document.querySelector('#music');
            music.volume -= 0.1;
            console.log('Music volume decreased to ' + music.volume);
        });
    },


});

AFRAME.registerComponent('spawn', {
    init: function () {
        this.el.addEventListener('click', () => {
            
        });
    },
});