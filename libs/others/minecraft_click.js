// (function(){
//     // 定义可用的Minecraft方块类型数组，可以自行扩展或修改
//     const blockTypes = [
//         {name: 'grass_block', url: ''}, 
//     ];

//     // 监听文档点击事件
//     document.addEventListener('click', function(e) {
//         // 随机选择一个方块类型
//         const randomBlock = blockTypes[Math.floor(Math.random() * blockTypes.length)];
//         createFallingBlock(e.clientX, e.clientY, randomBlock);
//     });

//     function createFallingBlock(x, y, block) {
//         // 1. 创建方块元素
//         const blockElement = document.createElement('div');
//         blockElement.className = 'minecraft-falling-block';

//         // 2. 应用基本样式（像素风）
//         Object.assign(blockElement.style, {
//             'position': 'fixed',
//             'width': '20px',
//             'height': '20px',
//             'background-color': block.color,
//             'left': x - 10 + 'px', // 居中于点击位置
//             'top': y - 10 + 'px',
//             'z-index': '99999',
//             'pointer-events': 'none',
//             'box-shadow': 'inset -2px -2px 0px rgba(0,0,0,0.2), inset 2px 2px 0px rgba(255,255,255,0.1)', // 营造立体感
//             'image-rendering': 'pixelated', // 保持像素感
//             'border': '1px solid rgba(0,0,0,0.3)',
//             'transition': 'transform 0.1s ease' // 用于落地效果
//         });

//         // 3. 将方块添加到页面
//         document.body.appendChild(blockElement);

//         // 4. 触发重力下落动画
//         let velocityY = 0;
//         let gravity = 0.5;
//         let animationId;
//         let isOnGround = false;

//         function animate() {
//             if (isOnGround) return; // 如果已落地，停止动画

//             velocityY += gravity;
//             const currentTop = parseFloat(blockElement.style.top);
//             const newTop = currentTop + velocityY;

//             // 检查是否到达视口底部（模拟落地）
//             if (newTop + 20 >= window.innerHeight) {
//                 // 落地效果：轻微压扁，然后移除
//                 blockElement.style.transition = 'all 0.3s ease';
//                 blockElement.style.transform = 'scale(1.1, 0.8)';
//                 blockElement.style.opacity = '0.7';

//                 setTimeout(() => {
//                     if (blockElement.parentNode) {
//                         blockElement.parentNode.removeChild(blockElement);
//                     }
//                 }, 300);
//                 isOnGround = true;
//                 cancelAnimationFrame(animationId);
//                 return;
//             }

//             blockElement.style.top = newTop + 'px';
//             animationId = requestAnimationFrame(animate);
//         }

//         // 开始动画
//         animationId = requestAnimationFrame(animate);

//         // 设置一个最长存在时间（例如5秒），防止方块因逻辑错误永远存在
//         setTimeout(() => {
//             if (blockElement.parentNode) {
//                 cancelAnimationFrame(animationId);
//                 blockElement.parentNode.removeChild(blockElement);
//             }
//         }, 5000);
//     }
// })();


(function(){
    // 定义方块纹理配置 - 使用您提供的图床URL
    const blockTypes = [
        { name: 'acacia_log', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/acacia_log.png' },
        { name: 'ancient_debris_side', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/ancient_debris_side.png' },
        { name: 'bee_nest_front', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/bee_nest_front.png' },
        { name: 'birch_log', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/birch_log.png' },
        { name: 'bricks', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/bricks.png' },
        { name: 'brown_mushroom_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/brown_mushroom_block.png' },
        { name: 'carved_pumpkin', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/carved_pumpkin.png' },
        { name: 'chiseled_stone_bricks', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/chiseled_stone_bricks.png' },
        { name: 'coal_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/coal_ore.png' },
        { name: 'cracked_stone_bricks', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/cracked_stone_bricks.png' },
        { name: 'crafting_table_front', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/crafting_table_front.png' },
        { name: 'diamond_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/diamond_block.png' },
        { name: 'diamond_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/diamond_ore.png' },
        { name: 'dropper_front', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/dropper_front.png' },
        { name: 'emerald_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/emerald_block.png' },
        { name: 'emerald_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/emerald_ore.png' },
        { name: 'enchanting_table_top', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/enchanting_table_top.png' },
        { name: 'end_stone', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/end_stone.png' },
        { name: 'end_stone_bricks', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/end_stone_bricks.png' },
        { name: 'furnace_front_on', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/furnace_front_on.png' },
        { name: 'gold_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/gold_block.png' },
        { name: 'gold_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/gold_ore.png' },
        { name: 'grass_block_side', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/grass_block_side.png' },
        { name: 'grass_block_snow', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/grass_block_snow.png' },
        { name: 'grass_path_side', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/grass_path_side.png' },
        { name: 'hay_block_side', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/hay_block_side.png' },
        { name: 'iron_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/iron_block.png' },
        { name: 'iron_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/iron_ore.png' },
        { name: 'jungle_log', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/jungle_log.png' },
        { name: 'lapis_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/lapis_block.png' },
        { name: 'lapis_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/lapis_ore.png' },
        { name: 'mossy_stone_bricks', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/mossy_stone_bricks.png' },
        { name: 'nether_gold_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/nether_gold_ore.png' },
        { name: 'nether_quartz_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/nether_quartz_ore.png' },
        { name: 'note_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/note_block.png' },
        { name: 'oak_log', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/oak_log.png' },
        { name: 'oak_planks', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/oak_planks.png' },
        { name: 'packed_ice', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/packed_ice.png' },
        { name: 'purpur_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/purpur_block.png' },
        { name: 'redstone_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/redstone_block.png' },
        { name: 'redstone_ore', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/redstone_ore.png' },
        { name: 'slime_block', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/slime_block.png' },
        { name: 'smooth_stone', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/smooth_stone.png' },
        { name: 'smooth_stone_slab_side', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/smooth_stone_slab_side.png' },
        { name: 'spruce_log', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/spruce_log.png' },
        { name: 'stone', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/stone.png' },
        { name: 'stone_bricks', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/stone_bricks.png' },
        { name: 'tnt_side', url: 'https://pub-afa265e5b09847ed9cfbc292d8a9fd94.r2.dev/hexo/minecraft/tnt_side.png' }
    ];

    // 纹理缓存，避免重复加载
    const textureCache = {};
    
    // 预加载纹理函数
    function preloadTextures() {
        blockTypes.forEach(block => {
            const img = new Image();
            img.onload = function() {
                textureCache[block.name] = img;
            };
            img.src = block.url;
        });
    }

    // 页面加载完成后开始预加载纹理
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadTextures);
    } else {
        preloadTextures();
    }

    // 监听文档点击事件
    document.addEventListener('click', function(e) {
        // 每次点击生成1-2个方块
        const blockCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < blockCount; i++) {
            setTimeout(() => {
                const randomBlock = blockTypes[Math.floor(Math.random() * blockTypes.length)];
                createFallingBlock(e.clientX, e.clientY, randomBlock);
            }, i * 50);
        }
    });

    function createFallingBlock(x, y, block) {
        // 创建方块元素
        const blockElement = document.createElement('div');
        blockElement.className = 'minecraft-falling-block';
        
        // 应用基本样式
        Object.assign(blockElement.style, {
            'position': 'fixed',
            'width': '20px',
            'height': '20px',
            'left': (x - 10 + (Math.random() * 40 - 20)) + 'px',
            'top': (y - 10 + (Math.random() * 40 - 20)) + 'px',
            'z-index': '99999',
            'pointer-events': 'none',
            'image-rendering': 'pixelated',
            'border': '1px solid rgba(0, 0, 0, 0.4)',
            'transition': 'transform 0.1s ease, opacity 0.3s ease',
            'transform': 'rotate(0deg)',
            'box-shadow': 'inset -2px -2px 0px rgba(0, 0, 0, 0.3), inset 2px 2px 0px rgba(255, 255, 255, 0.2)',
            'background-size': 'cover',
            'background-position': 'center'
        });

        // 设置纹理
        if (textureCache[block.name]) {
            // 如果纹理已缓存，直接使用
            blockElement.style.backgroundImage = `url(${textureCache[block.name].src})`;
        } else {
            // 否则创建新的Image对象加载纹理
            const img = new Image();
            img.onload = function() {
                blockElement.style.backgroundImage = `url(${block.url})`;
                textureCache[block.name] = img;
            };
            img.src = block.url;
            
            // 加载失败时的回退方案
            img.onerror = function() {
                console.warn(`无法加载纹理: ${block.url}`);
                // 使用简单的颜色回退
                const fallbackColors = {
                    'grass_block_side': '#7CBD6B',
                    'dirt': '#8B6914',
                    'stone': '#7F7F7F',
                    'oak_planks': '#C49F6E',
                    'diamond_ore': '#6DDBE0',
                    'redstone_block': '#FF0000'
                    // 可以添加更多方块的回退颜色
                };
                blockElement.style.backgroundColor = fallbackColors[block.name] || '#CCCCCC';
            };
        }

        // 将方块添加到页面
        document.body.appendChild(blockElement);

        // 物理参数
        let velocityY = 0;
        let gravity = 0.5;
        let rotation = 0;
        let rotationSpeed = (Math.random() * 4 - 2);
        let animationId;
        let isOnGround = false;

        function animate() {
            if (isOnGround) return;

            velocityY += gravity;
            rotation += rotationSpeed;
            const currentTop = parseFloat(blockElement.style.top);
            const newTop = currentTop + velocityY;

            // 检查是否到达视口底部
            if (newTop + 20 >= window.innerHeight) {
                // 落地效果
                blockElement.style.transition = 'all 0.4s ease';
                blockElement.style.transform = `translateY(-10px) rotate(${rotation}deg)`;
                blockElement.style.opacity = '0.7';

                setTimeout(() => {
                    blockElement.style.transform = `translateY(0) rotate(${rotation}deg)`;
                    blockElement.style.opacity = '0.3';
                }, 150);

                setTimeout(() => {
                    if (blockElement.parentNode) {
                        blockElement.parentNode.removeChild(blockElement);
                    }
                }, 400);
                isOnGround = true;
                cancelAnimationFrame(animationId);
                return;
            }

            // 更新位置和旋转
            blockElement.style.top = newTop + 'px';
            blockElement.style.transform = `rotate(${rotation}deg)`;

            animationId = requestAnimationFrame(animate);
        }

        // 开始动画
        animationId = requestAnimationFrame(animate);

        // 设置最长存在时间
        setTimeout(() => {
            if (blockElement.parentNode) {
                cancelAnimationFrame(animationId);
                blockElement.parentNode.removeChild(blockElement);
            }
        }, 5000);
    }
})();