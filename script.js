// 全局变量
let cameraMovementsData = [];
let currentMovement = null;

// Cloudinary视频URL映射表 - 与本地文件名一一对应
const videoUrlMap = {
    '01.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056519/01_mclvyq.mp4',
    '02.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056512/02_bd1yqq.mp4',
    '03.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056513/03_i1ifeq.mp4',
    '04.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056511/04_acdysb.mp4',
    '05.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056515/05_jqc8vd.mp4',
    '06.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056514/06_odlxvm.mp4',
    '07.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056528/07_ebkils.mp4',
    '08.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056536/08_z326rl.mp4',
    '09.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056529/09_nrgjs4.mp4',
    '10.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056512/10_wfd1xv.mp4',
    '11.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056511/11_tusmff.mp4',
    '12.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056511/12_stigyv.mp4',
    '13.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056512/13_odj1ag.mp4',
    '14.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056514/14_js8sp1.mp4',
    '15.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056514/15_py682u.mp4',
    '16.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056525/16_rmk3d1.mp4',
    '17.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056515/17_n30inf.mp4',
    '18.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056516/18_woypb0.mp4',
    '19.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056516/19_pmo6ho.mp4',
    '20.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056527/20_gobhsw.mp4',
    '21.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056516/21_m02nkk.mp4',
    '22.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056519/22_m8i58q.mp4',
    '23.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056518/23_ybfwg9.mp4',
    '24.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056518/24_bypinq.mp4',
    '25.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056519/25_qog0te.mp4',
    '26.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056520/26_fkh4ep.mp4',
    '27.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056521/27_cbfzwx.mp4',
    '28.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056541/28_ssguln.mp4',
    '29.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056521/29_l0qhiu.mp4',
    '30.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056522/30_tzipca.mp4',
    '31.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056522/31_n9beql.mp4',
    '32.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056523/32_luesbq.mp4',
    '33.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056524/33_wpofp9.mp4',
    '34.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056524/34_mu7ykt.mp4',
    '35.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056525/35_gkxscc.mp4',
    '36.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056525/36_f0dx5h.mp4',
    '37.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056525/37_hgjlz0.mp4',
    '38.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056526/38_ui5p3e.mp4',
    '39.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056526/39_n7aaph.mp4',
    '40.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056535/40_mkatts.mp4',
    '41.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056527/41_irki6k.mp4',
    '42.mp4': 'https://res.cloudinary.com/drcq5lsmz/video/upload/v1768056527/42_tmlugw.mp4'
};

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

    if (videoFileName && videoUrlMap[videoFileName]) {
        // 使用Cloudinary视频URL映射表中的URL
        const cloudVideoUrl = videoUrlMap[videoFileName];
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