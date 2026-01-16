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
    
    // 初始化标签页功能
    initTabs();
    
    // 初始化故事板生成器功能
    initStoryboardGenerator();
});

// 标签页功能初始化
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const mainTitle = document.querySelector('header h1');
    const mainSubtitle = document.querySelector('header p');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // 添加当前活动状态
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // 根据标签页更新标题
            if (targetTab === 'tab1') {
                mainTitle.textContent = '运镜方式展示';
                mainSubtitle.textContent = '点击下方运镜方式查看视频预览和提示词';
            } else if (targetTab === 'tab2') {
                mainTitle.textContent = '故事板提示词生成器';
                mainSubtitle.textContent = 'Storyboard Prompt Generator';
            }
        });
    });
}

// 故事板生成器初始化
function initStoryboardGenerator() {
    // 生成提示词按钮事件监听
    const storyboard_generateBtn = document.getElementById('generate-btn');
    if (storyboard_generateBtn) {
        storyboard_generateBtn.addEventListener('click', storyboard_generatePrompt);
    }
    
    // 复制提示词按钮事件监听
    const storyboard_copyBtn = document.getElementById('copy-btn');
    if (storyboard_copyBtn) {
        storyboard_copyBtn.addEventListener('click', storyboard_copyPrompt);
    }
    
    // 导出故事板按钮事件监听
    const storyboard_exportBtn = document.getElementById('export-btn');
    if (storyboard_exportBtn) {
        storyboard_exportBtn.addEventListener('click', storyboard_exportStoryboard);
    }
    
    // 清空所有按钮事件监听
    const storyboard_clearBtn = document.getElementById('clear-btn');
    if (storyboard_clearBtn) {
        storyboard_clearBtn.addEventListener('click', storyboard_clearAll);
    }
}

// 故事板生成器 - 导出故事板函数
function storyboard_exportStoryboard() {
    const promptText = document.getElementById('prompt-result').textContent;
    
    if (!promptText) {
        alert('请先生成提示词');
        return;
    }
    
    // 获取当前日期时间
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const dateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`;
    const fileName = `Storyboard_${dateTime}.txt`;
    
    // 创建Blob对象
    const blob = new Blob([promptText], { type: 'text/plain;charset=utf-8' });
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    
    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// 故事板生成器 - 清空所有函数
function storyboard_clearAll() {
    // 询问用户是否确认清空
    if (!confirm('确定要清空所有内容吗？')) {
        return;
    }
    
    // 清空所有输入框
    for (let i = 1; i <= 9; i++) {
        const durationInput = document.getElementById(`duration-${i}`);
        const shotTypeInput = document.getElementById(`shot-type-${i}`);
        const movementInput = document.getElementById(`movement-${i}`);
        const contentInput = document.getElementById(`content-${i}`);
        
        if (durationInput) durationInput.value = '';
        if (shotTypeInput) shotTypeInput.value = '';
        if (movementInput) movementInput.value = '';
        if (contentInput) contentInput.value = '';
    }
    
    // 取消所有选项勾选
    const noSubtitles = document.getElementById('no-subtitles');
    const noMusic = document.getElementById('no-music');
    const noVoiceover = document.getElementById('no-voiceover');
    
    if (noSubtitles) noSubtitles.checked = false;
    if (noMusic) noMusic.checked = false;
    if (noVoiceover) noVoiceover.checked = false;
    
    // 清空提示词结果
    const resultElement = document.getElementById('prompt-result');
    if (resultElement) resultElement.textContent = '';
    
    // 禁用复制按钮
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) copyBtn.disabled = true;
}

// 故事板生成器 - 生成提示词函数
function storyboard_generatePrompt() {
    let prompt = '';
    let hasShots = false;
    
    // 遍历9个镜头
    for (let i = 1; i <= 9; i++) {
        const duration = document.getElementById(`duration-${i}`).value;
        const shotType = document.getElementById(`shot-type-${i}`).value;
        const movement = document.getElementById(`movement-${i}`).value;
        const content = document.getElementById(`content-${i}`).value;
        
        // 检查镜头是否有数据（至少有一个字段填写）
        if (duration || shotType || movement || content) {
            hasShots = true;
            
            // 构建镜头信息
            prompt += `shot ${i}: \n`;
            
            // 添加持续时间（如果有填写）
            if (duration) {
                prompt += `duration: ${duration}sec \n`;
            } else {
                prompt += `duration: \n`;
            }
            
            // 构建Scene内容
            let sceneContent = '';
            
            if (shotType) {
                sceneContent += shotType;
            }
            
            if (movement) {
                if (sceneContent) sceneContent += ',';
                sceneContent += movement;
            }
            
            if (content) {
                if (sceneContent) sceneContent += ',';
                sceneContent += content;
            }
            
            // 转换中文标点为英文标点
            sceneContent = storyboard_convertToEnglishPunctuation(sceneContent);
            
            // 添加Scene行
            prompt += `Scene: ${sceneContent}. \n\n`;
        }
    }
    
    // 添加制作选项
    let options = [];
    if (document.getElementById('no-subtitles').checked) {
        options.push('无字幕');
    }
    if (document.getElementById('no-music').checked) {
        options.push('无音乐');
    }
    if (document.getElementById('no-voiceover').checked) {
        options.push('无配音');
    }
    
    if (options.length > 0) {
        prompt += `确保全程${options.join(',')}.`;
    }
    
    // 移除最后的两个换行符
    prompt = prompt.trim();
    
    // 显示生成的提示词
    const resultElement = document.getElementById('prompt-result');
    resultElement.textContent = prompt;
    
    // 启用/禁用复制按钮
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.disabled = !hasShots;
}

// 故事板生成器 - 复制提示词函数
function storyboard_copyPrompt() {
    const promptText = document.getElementById('prompt-result').textContent;
    
    // 创建临时textarea元素
    const textarea = document.createElement('textarea');
    textarea.value = promptText;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // 选择并复制文本
    textarea.select();
    document.execCommand('copy');
    
    // 移除临时元素
    document.body.removeChild(textarea);
    
    // 显示复制成功提示
    const copyBtn = document.getElementById('copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '已复制！';
    copyBtn.style.backgroundColor = '#95a5a6';
    
    // 恢复按钮状态
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.backgroundColor = '#2ecc71';
    }, 2000);
}

// 故事板生成器 - 转换中文标点为英文标点函数
function storyboard_convertToEnglishPunctuation(text) {
    return text
        .replace(/，/g, ',')      // 中文逗号转英文逗号
        .replace(/。/g, '.')      // 中文句号转英文句号
        .replace(/；/g, ';')      // 中文分号转英文分号
        .replace(/：/g, ':')      // 中文冒号转英文冒号
        .replace(/？/g, '?')      // 中文问号转英文问号
        .replace(/！/g, '!')      // 中文感叹号转英文感叹号
        .replace(/“/g, '"')      // 中文引号转英文引号
        .replace(/”/g, '"')      // 中文引号转英文引号
        .replace(/‘/g, "'")      // 中文单引号转英文单引号
        .replace(/’/g, "'")      // 中文单引号转英文单引号
        .replace(/（/g, '(')      // 中文左括号转英文左括号
        .replace(/）/g, ')')      // 中文右括号转英文右括号
        .replace(/【/g, '[')      // 中文左方括号转英文左方括号
        .replace(/】/g, ']')      // 中文右方括号转英文右方括号
        .replace(/《/g, '<')      // 中文左书名号转英文左尖括号
        .replace(/》/g, '>');     // 中文右书名号转英文右尖括号
}

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
