document.addEventListener('DOMContentLoaded', () => {
    const avatarGridContainer = document.querySelector('.avatar-grid-container');
    const modal = document.getElementById('personModal');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalName = document.getElementById('modalName');
    const modalGender = document.getElementById('modalGender');
    const modalBio = document.getElementById('modalBio');
    const closeButton = document.querySelector('.close-button');

    const numAvatars = 8;
    const mockData = [];

    // 模拟数据生成
    const firstNames = ["雷", "暴", "影", "刃", "月", "星", "火", "冰", "夜", "鹰"];
    const lastNames = ["之手", "行者", "颂者", "之心", "低语", "咆哮", "尖啸", "利爪", "暗裔", "追光者"];
    const genders = ["男", "女", "未知"];
    const bios = [
        "在霓虹灯与暗影交织的都市中寻找失落的旋律。",
        "代码与吉他弦是我的武器，反抗是我的宿命。",
        "曾是摇滚乐队的主唱，如今是都市传说中的独行侠。",
        "用音乐撼动既定的秩序，用才华点亮黑夜。",
        "穿梭于虚拟与现实的边缘，记录着时代的噪音。",
        "一颗不羁的灵魂，在反叛的火焰中燃烧。",
        "他的过去像一首破碎的歌谣，未来则充满未知的乐章。",
        "用最华丽的姿态，演奏最狂野的乐曲。",
        "荆棘玫瑰是她的徽章，在逆境中绽放。",
        "闪电般划破长空，只为一瞬的自由与真实。"
    ];

    for (let i = 0; i < numAvatars; i++) {
        const uniqueId = `minerva_project_user_${Date.now() + i}`; // 生成更唯一的字符串给 RoboHash
        mockData.push({
            id: i,
            // 更新: 使用 RoboHash.org 生成头像, set=set1 生成机器人头像
            // 您也可以尝试 set=set2 (怪物), set=set3 (机器人头像), set=set4 (猫)
            avatarUrl: `https://robohash.org/${uniqueId}?size=150x150&set=set1`,
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]}${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            gender: genders[Math.floor(Math.random() * genders.length)],
            bio: bios[Math.floor(Math.random() * bios.length)]
        });
    }

    // mockData.push({
    //     id: 9,
    //     avatarUrl: `./Kaeya_Avatar.webp`,
    //     name: `凯亚`,
    //     gender: `男`,
    //     bio: `“我会用我的剑，守护你们的未来。”`
    // });

    // mockData.push({
    //     id: 9,
    //     avatarUrl: `./Escoffier_Avatar.webp`,
    //     name: `爱可菲`,
    //     gender: `女`,
    //     bio: `“‘司掌甜蜜的精灵’、‘统御味蕾的暴君’？也没报纸上传得那么夸张哦，爱可菲只是个喜欢烹饪的…有一点点严格的女孩啦。那些不认真对待料理的家伙，当然也得不到她的尊重！总之，你们两个的‘风味’一定能搭配得好，我保证！”`
    // });

    // 渲染头像到网格
    mockData.forEach(person => {
        const avatarItem = document.createElement('div');
        avatarItem.classList.add('avatar-item');
        const img = document.createElement('img');
        img.src = person.avatarUrl;
        img.alt = `${person.name}'s avatar`;
        // 处理图片加载失败的情况 (可选, 但推荐)
        img.onerror = function() {
            // 如果 RoboHash 加载失败，可以设置一个备用图像或样式
            this.alt = 'Avatar loading failed';
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22150%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20150%20150%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_179bb52958d%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_179bb52958d%22%3E%3Crect%20width%3D%22150%22%20height%3D%22150%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2250%22%20y%3D%2275%22%3EError%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'; // 一个简单的SVG占位符
            console.warn(`Failed to load image: ${this.src}`);
        };
        avatarItem.appendChild(img);
        avatarItem.addEventListener('click', () => openModal(person));
        avatarGridContainer.appendChild(avatarItem);
    });

    // 打开弹窗并填充数据
    function openModal(person) {
        modalAvatar.src = person.avatarUrl;
        // 弹窗内头像也需要错误处理
        modalAvatar.onerror = function() {
            this.alt = 'Avatar loading failed';
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22150%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20150%20150%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_179bb52958d%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_179bb52958d%22%3E%3Crect%20width%3D%22150%22%20height%3D%22150%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2250%22%20y%3D%2275%22%3EError%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
        };
        modalName.textContent = person.name;
        modalGender.textContent = `性别: ${person.gender}`;
        modalBio.textContent = person.bio;
        modal.style.display = 'block';
    }

    // 关闭弹窗
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});