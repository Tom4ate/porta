
export default class ExamplesNotUsed {
    
    fbxLoadModels(type = null ) {

        var items = [
            "models/characters/FBX/Witch.fbx"
            // "models/characters/FBX/BlueSoldier_Female.fbx","models/characters/FBX/BlueSoldier_Male.fbx",
            // "models/characters/FBX/Casual2_Female.fbx","models/characters/FBX/Casual2_Male.fbx","models/characters/FBX/Casual3_Female.fbx",
            // "models/characters/FBX/Casual3_Male.fbx","models/characters/FBX/Casual_Bald.fbx","models/characters/FBX/Casual_Female.fbx","models/characters/FBX/Casual_Male.fbx",
            // "models/characters/FBX/Chef_Female.fbx","models/characters/FBX/Chef_Hat.fbx","models/characters/FBX/Chef_Male.fbx","models/characters/FBX/Cow.fbx","models/characters/FBX/Cowboy_Female.fbx",
            // "models/characters/FBX/Cowboy_Hair.fbx","models/characters/FBX/Cowboy_Male.fbx","models/characters/FBX/Doctor_Female_Old.fbx","models/characters/FBX/Doctor_Female_Young.fbx",
            // "models/characters/FBX/Doctor_Male_Old.fbx","models/characters/FBX/Doctor_Male_Young.fbx","models/characters/FBX/Elf.fbx","models/characters/FBX/Goblin_Female.fbx","models/characters/FBX/Goblin_Male.fbx",
            // "models/characters/FBX/Kimono_Female.fbx","models/characters/FBX/Kimono_Male.fbx","models/characters/FBX/Knight_Golden_Female.fbx","models/characters/FBX/Knight_Golden_Male.fbx",
            // "models/characters/FBX/Knight_Male.fbx","models/characters/FBX/Ninja_Female.fbx","models/characters/FBX/Ninja_Male.fbx","models/characters/FBX/Ninja_Male_Hair.fbx","models/characters/FBX/Ninja_Sand.fbx",
            // "models/characters/FBX/Ninja_Sand_Female.fbx","models/characters/FBX/OldClassy_Female.fbx","models/characters/FBX/OldClassy_Male.fbx","models/characters/FBX/Pirate_Female.fbx",
            // "models/characters/FBX/Pirate_Male.fbx","models/characters/FBX/Pug.fbx","models/characters/FBX/Soldier_Female.fbx","models/characters/FBX/Soldier_Male.fbx","models/characters/FBX/Suit_Female.fbx","models/characters/FBX/Suit_Male.fbx",
            // "models/characters/FBX/VikingHelmet.fbx","models/characters/FBX/Viking_Female.fbx","models/characters/FBX/Viking_Male.fbx","models/characters/FBX/Witch.fbx","models/characters/FBX/Wizard.fbx","models/characters/FBX/Worker_Female.fbx",
            // "models/characters/FBX/Worker_Male.fbx","models/characters/FBX/Zombie_Female.fbx","models/characters/FBX/Zombie_Male.fbx"
        ];

        // var items = [
        //     "models/monster/FBX/Bat.fbx","models/monster/FBX/Dragon.fbx","models/monster/FBX/Skeleton.fbx","models/monster/FBX/Slime.fbx"
        // ];

        var self = this;
        var loader = new FBXLoader();
                            
        var x = 0;
        var z = 0;

        for (let index = 0; index < items.length; index++) {

            var item = items[index];
            
            loader.load(item,function(object) {
                let pos = { x: x * 2 , z: z * - 2 };

                object.position.setZ(pos.z);
                object.position.setX(pos.x);
                object.scale.setLength(0.015);
                let id = self.addToMap( object , "items" );
                self.addAnimations(object ,id,"items");
                
                if(z > 10){
                    z = 0;
                    x++;
                } else {    
                    z++;
                }
                
            });
                            
        }
    }
    
    setupSky() {
        var self = this;
        
        new RGBELoader()
        .setPath( 'textures/' )
        .load( 'sky.hdr', function ( texture ) {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            self.scene.background = texture;
            self.scene.environment = texture;

            self.render();
            
        });
    }

    
    gltfLoadThree(){
        var self = this;
        // use of RoughnessMipmapper is optional
        const roughnessMipmapper = new RoughnessMipmapper( self.renderer );

        const loader = new GLTFLoader().setPath( 'models/birch_1/' );
        loader.load( 'birch_1.gltf', function ( gltf ) {

            gltf.scene.traverse( function ( child ) {

                if ( child.isMesh ) {

                    roughnessMipmapper.generateMipmaps( child.material );

                }

            } );

            self.scene.add( gltf.scene );

            roughnessMipmapper.dispose();

            self.render();

        } );
        
    }
    
    createRawShape() {
        var verticesOfCube = [
            -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
            -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
        ];
        
        var indicesOfFaces = [
            2,1,0,    0,3,2,
            0,4,7,    7,3,0,
            0,1,5,    5,4,0,
            1,2,6,    6,5,1,
            2,3,7,    7,6,2,
            4,5,6,    6,7,4
        ];
        
        let mapaData = this.store.getMap();
        var geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 4, 2 );
        var material = new THREE.MeshBasicMaterial({
            color: mapaData.color,
            // side: THREE.FrontSide,
            // vertexColors: THREE.VertexColors,
        });
        var terrain = new THREE.Mesh( geometry, material );	
        
        terrain.receiveShadow = true;
        terrain.position.add({x: 0, y: 0, z:0 });
        terrain.geometry.rotateX(Math.PI / -2)

        console.log("terrain",terrain)
        
        this.addToMap( terrain, "planes" );
    }
    
}