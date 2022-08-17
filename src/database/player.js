export default function () {
    return {
        entyti_type: "player",
        name: "player",
        loaderType: "fbx",
        // fileName: "Witch.fbx",
        // filePath: "models/characters/quaternius/small-black/FBX/",
        fileName: "default-male.fbx",
        filePath: "models/characters/mixamo/",
        actions: [
            {
                name: "walkFowerd",
                keyControl: {
                    key: "w",
                    event: "keypress",
                    function: "walkFowerd",
                },
            },
            {
                name: "walkBackwards",
                keyControl: {
                    key: "s",
                    event: "keypress",
                    function: "walkBackwards",
                },
            },
            {
                name: "turnLeft",
                keyControl: {
                    key: "a",
                    event: "keypress",
                    function: "turnLeft",
                },
            },
            {
                name: "turnRight",
                keyControl: {
                    key: "d",
                    event: "keypress",
                    function: "turnRight",
                },
            },
            {
                name: "stopFowerd",
                keyControl: {
                    key: "w",
                    event: "keyup",
                    function: "stopFowerd",
                },
            },
            {
                name: "stopBackwards",
                keyControl: {
                    key: "s",
                    event: "keyup",
                    function: "stopBackwards",
                },
            },
            
            {
                name: "stopTurnLeft",
                keyControl: {
                    key: "a",
                    event: "keyup",
                    function: "stopTurnLeft",
                },
            },
            
            {
                name: "stopTurnRight",
                keyControl: {
                    key: "d",
                    event: "keyup",
                    function: "stopTurnRight",
                },
            },
            {
                name: "punch",
                keyControl: {
                    event: "click",
                    function: "punch",
                },
            },           
        ],
        animations: [
            {
                name: "walk",
                // _self: 7
                fileName: "walking.fbx",
                filePath: "models/animations/",
                loaderType: "fbx"
            },
            // {
                // name: "punch",
                // _self: 10
                // fileName: "walk.fbx",
                // filePath: "models/animations/",
                // loaderType: "fbx"
            // }
        ]
    };
}