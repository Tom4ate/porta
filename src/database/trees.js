export default function () {
    let treeAmount = 10;
    let trees = [];

    for (let i = 0; i < treeAmount; i++) {
        trees.push({
            name: i + " Tree ",
            entity_type: "base-tree",
            position: {
                x: parseInt(Math.random() * 100),
                y: 1,
                z: parseInt(Math.random() * 100),
            }
        });
    }
    
    return trees;
}