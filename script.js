// 全局变量
let cameraMovementsData = [];
let currentMovement = null;
let currentCDN = 'cloudinary'; // 默认使用Cloudinary

// 腾讯云COS视频URL前缀
const TENCENT_CLOUD_PREFIX = 'https://cam-motion-1394308214.cos.ap-beijing.myqcloud.com/Cam-Motion-shots/';

// Cloudinary视频URL映射表 - 与本地文件名一一对应
const CLOUDINARY_VIDEO_MAP = {
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

// 更新图床显示信息
function updateCDNDisplay() {
    const cdnProviderElement = document.getElementById('cdnProvider');
    if (cdnProviderElement) {
        if (currentCDN === 'cloudinary') {
            cdnProviderElement.textContent = 'Cloudinary';
        } else {
            cdnProviderElement.textContent = '腾讯云COS';
        }
    }
}

// 切换图床
function switchCDN() {
    // 切换图床
    currentCDN = currentCDN === 'cloudinary' ? 'tencent' : 'cloudinary';
    
    // 更新显示
    updateCDNDisplay();
    
    // 重新加载当前视频
    if (currentMovement) {
        updateVideoPreview(currentMovement);
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 加载运镜方式数据
    loadCameraMovements();
    
    // 初始化图床切换按钮
    const switchBtn = document.getElementById('switchCDN');
    if (switchBtn) {
        switchBtn.addEventListener('click', switchCDN);
    }
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
    header.appendChild(number);

    // 添加中文名称
    const name = document.createElement('h4');
    name.textContent = movement['中文名称'] || '未知运镜方式';
    header.appendChild(name);

    card.appendChild(header);

    // 添加英文名称
    const englishName = document.createElement('p');
    englishName.textContent = movement['英文名称'] || '';
    card.appendChild(englishName);

    // 添加点击事件
    card.addEventListener('click', () => {
        selectMovement(movement);
    });

    return card;
}

// 选择运镜方式
function selectMovement(movement) {
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
        let cloudVideoUrl;
        
        if (currentCDN === 'tencent') {
            // 使用腾讯云COS
            cloudVideoUrl = `${TENCENT_CLOUD_PREFIX}${encodeURIComponent(videoFileName)}`;
        } else {
            // 默认使用Cloudinary
            cloudVideoUrl = CLOUDINARY_VIDEO_MAP[videoFileName] || '';
        }
        
        if (cloudVideoUrl) {
            videoElement.src = cloudVideoUrl;
            videoElement.load();
        } else {
            videoElement.src = '';
            videoElement.innerHTML = '无视频文件';
        }
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
    englishElement.textContent = movement['英文名称'] || 'English Name';
}

// 更新提示词
function updatePromptText(movement) {
    const promptElement = document.getElementById('promptText');
    promptElement.value = movement['提示词'] || '';
}

// 更新卡片选中状态
function updateSelectedCard(movement) {
    // 移除所有卡片的选中状态
    const cards = document.querySelectorAll('.movement-card');
    cards.forEach(card => card.classList.remove('active'));

    // 找到当前选中的卡片并添加选中状态
    const currentIndex = cameraMovementsData.findIndex(item => item['中文名称'] === movement['中文名称']);
    if (currentIndex !== -1) {
        const selectedCard = document.querySelector(`[data-index="${currentIndex}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }
    }
}

// 复制提示词功能
function initCopyFunctionality() {
    const copyBtn = document.getElementById('copyBtn');
    const promptText = document.getElementById('promptText');

    copyBtn.addEventListener('click', () => {
        promptText.select();
        promptText.setSelectionRange(0, 99999); // 适配移动设备

        try {
            document.execCommand('copy');
            copyBtn.textContent = '已复制！';
            
            // 2秒后恢复按钮文本
            setTimeout(() => {
                copyBtn.textContent = '复制提示词';
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制。');
        }
    });
}

// 页面加载完成后初始化复制功能
document.addEventListener('DOMContentLoaded', initCopyFunctionality);
