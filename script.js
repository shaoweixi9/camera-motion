// 全局变量
let cameraMovementsData = [];
let currentMovement = null;

// 腾讯云COS视频URL前缀
const TENCENT_CLOUD_PREFIX = 'https://cam-motion-1394308214.cos.ap-beijing.myqcloud.com/Cam-Motion-shots/';

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadCameraMovements();
});

// 从JSON文件加载运镜方式数据
async function loadCameraMovements() {
    try {
        const response = await fetch('camera_movements.json');
        cameraMovementsData = await response.json();
        renderMovementCards();
        
        // 如果有数据，默认选择第一个
        if (cameraMovementsData.length > 0) {
            selectMovement(cameraMovementsData[0]);
        }
    } catch (error) {
        console.error('加载运镜方式数据失败:', error);
        alert('加载运镜方式数据失败，请检查文件路径是否正确。');
    }
}

// 渲染运镜方式卡片
function renderMovementCards() {
    const movementsGrid = document.getElementById('movementsGrid');
    movementsGrid.innerHTML = '';

    cameraMovementsData.forEach((movement, index) => {
        const card = createMovementCard(movement, index);
        movementsGrid.appendChild(card);
    });
}

// 创建单个运镜方式卡片
function createMovementCard(movement, index) {
    const card = document.createElement('div');
    card.className = 'movement-card';
    card.dataset.index = index;

    // 创建头部容器（包含序号和中文名称）
    const header = document.createElement('div');
    header.className = 'movement-header';

    // 添加序号
    const number = document.createElement('div');
    number.className = 'movement-number';
    number.textContent = index + 1;

    const title = document.createElement('h4');
    title.textContent = movement['中文名称'] || `运镜方式 ${index + 1}`;

    const englishName = document.createElement('p');
    englishName.textContent = movement['英文名称'] || 'Unknown';

    // 将序号和中文名称添加到头部容器
    header.appendChild(number);
    header.appendChild(title);

    // 将头部容器和英文名称添加到卡片
    card.appendChild(header);
    card.appendChild(englishName);

    // 添加点击事件
    card.addEventListener('click', () => {
        selectMovement(movement);
    });

    return card;
}

// 选择运镜方式并显示详情
function selectMovement(movement) {
    // 更新当前选中的运镜方式
    currentMovement = movement;

    // 更新视频预览
    updateVideoPreview(movement);

    // 更新运镜方式信息
    updateMovementInfo(movement);

    // 更新提示词
    updatePromptText(movement);

    // 更新卡片选中状态
    updateSelectedCard(movement);
}

// 更新视频预览
function updateVideoPreview(movement) {
    const videoElement = document.getElementById('previewVideo');
    const videoFileName = movement['文件名'];

    if (videoFileName) {
        // 使用腾讯云COS统一地址前缀 + 文件名
        const cloudVideoUrl = `${TENCENT_CLOUD_PREFIX}${encodeURIComponent(videoFileName)}`;
        videoElement.src = cloudVideoUrl;
        videoElement.load();
    } else {
        videoElement.src = '';
        videoElement.innerHTML = '无视频文件';
    }
}

// 更新运镜方式信息
function updateMovementInfo(movement) {
    const titleElement = document.getElementById('movementTitle');
    const englishElement = document.getElementById('movementEnglish');

    titleElement.textContent = movement['中文名称'] || '未知运镜方式';
    englishElement.textContent = movement['英文名称'] || 'Unknown';
}

// 更新提示词
function updatePromptText(movement) {
    const promptElement = document.getElementById('promptText');
    const promptText = movement['提示词'] || '无提示词';

    promptElement.value = promptText;
}

// 更新卡片选中状态
function updateSelectedCard(movement) {
    // 移除所有卡片的选中状态
    document.querySelectorAll('.movement-card').forEach(card => {
        card.classList.remove('active');
    });

    // 找到当前选中的卡片并添加选中状态
    const selectedCard = document.querySelector(`[data-index="${cameraMovementsData.findIndex(m => m === movement)}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
}

// 复制提示词功能
document.getElementById('copyBtn').addEventListener('click', () => {
    const promptElement = document.getElementById('promptText');
    
    // 选择文本
    promptElement.select();
    promptElement.setSelectionRange(0, 99999); // 移动设备支持
    
    try {
        // 复制到剪贴板
        document.execCommand('copy');
        
        // 显示复制成功提示
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '已复制！';
        copyBtn.style.backgroundColor = '#27ae60';
        
        // 3秒后恢复原始状态
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '#3498db';
        }, 3000);
    } catch (error) {
        console.error('复制失败:', error);
        alert('复制失败，请手动选择并复制。');
    }
    
    // 取消选择
    window.getSelection().removeAllRanges();
});