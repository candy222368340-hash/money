// 1. 宣告模擬政治獻金開放數據庫 (練習用資料)
const donationData = [
    { date: "2026-03-12", name: "頂尖科技股份有限公司", type: "企業", target: "A 政黨候選人", amount: 1500000 },
    { date: "2026-03-15", name: "陳大明", type: "個人", target: "B 政黨候選人", amount: 20000 },
    { date: "2026-04-02", name: "綠能發展開發公司", type: "企業", target: "A 政黨候選人", amount: 800000 },
    { date: "2026-04-18", name: "李小華", type: "個人", target: "A 政黨候選人", amount: 5000 },
    { date: "2026-05-01", name: "大安營造集團", type: "企業", target: "B 政黨候選人", amount: 2000000 },
    { date: "2026-05-22", name: "張美玲", type: "個人", target: "B 政黨候選人", amount: 100000 },
    { date: "2026-06-05", name: "創投生技有限公司", type: "企業", target: "A 政黨候選人", amount: 1200000 }
];

// 2. 取得 DOM 節點
const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const noDataMsg = document.getElementById('no-data-msg');

// 當前的篩選狀態紀錄
let currentFilterType = 'all';
let currentSearchKeyword = '';

// 3. 渲染資料表格函數
function renderTable() {
    // 清空現有表格內容
    tableBody.innerHTML = '';
    
    // 進行多重過濾 (同時滿足快篩與關鍵字)
    const filteredData = donationData.filter(item => {
        const matchType = (currentFilterType === 'all' || item.type === currentFilterType);
        const matchKeyword = (item.name.includes(currentSearchKeyword) || item.target.includes(currentSearchKeyword));
        return matchType && matchKeyword;
    });

    // 如果沒有符合的資料，顯示提示訊息
    if (filteredData.length === 0) {
        noDataMsg.style.display = 'block';
        return;
    } else {
        noDataMsg.style.display = 'none';
    }

    // 將過濾後的資料串接成 HTML 結構注入
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td><strong>${item.name}</strong></td>
            <td><span class="type-tag">${item.type}</span></td>
            <td>${item.target}</td>
            <td class="text-right" style="font-weight:bold; color:#1d3557;">
                $${item.amount.toLocaleString()}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. 監聽關鍵字輸入框 (即時連動)
searchInput.addEventListener('input', (e) => {
    currentSearchKeyword = e.target.value.trim();
    renderTable(); // 重新渲染
});

// 5. 監聽快篩按鈕點擊
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // 切換按鈕的 active 樣式
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // 取得按鈕設定的類別並更新渲染
        currentFilterType = e.target.getAttribute('data-type');
        renderTable();
    });
});

// 6. 初始化頁面載入
window.addEventListener('DOMContentLoaded', () => {
    renderTable();
});