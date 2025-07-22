/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// --- Gamification for Mypage ---
window.addEventListener('DOMContentLoaded', function() {
    // Animation/Interactive effect for .skill, .interest, .badge
    document.querySelectorAll('.skill, .interest, .badge').forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            el.style.transform = 'scale(1.12) rotate(-2deg)';
            el.style.boxShadow = '0 4px 16px #4caf5040';
        });
        el.addEventListener('mouseleave', function() {
            el.style.transform = '';
            el.style.boxShadow = '';
        });
    });
    // ปุ่มเด้ง (back-btn)
    var backBtn = document.querySelector('.back-btn');
    if(backBtn) {
        backBtn.addEventListener('mousedown', function(){ this.style.transform = 'scale(0.95)'; });
        backBtn.addEventListener('mouseup', function(){ this.style.transform = ''; });
    }
    // Spin reward logic (ถ้ามีปุ่ม)
    var spinBtn = document.getElementById('spin-btn');
    if(spinBtn) {
        var level = 1, exp = 10;
        var rewards = [
            {text:'EXP +20', type:'exp', value:20},
            {text:'EXP +50', type:'exp', value:50},
            {text:'เหรียญทอง 🥇', type:'badge', value:'🥇 นักล่ารางวัล'},
            {text:'เหรียญเงิน 🥈', type:'badge', value:'🥈 ขยัน'},
            {text:'EXP +10', type:'exp', value:10},
            {text:'EXP +100', type:'exp', value:100},
            {text:'เหรียญทองแดง 🥉', type:'badge', value:'🥉 มือใหม่'},
        ];
        function updateProgress() {
            var levelEl = document.getElementById('level');
            var expEl = document.getElementById('exp');
            var bar = document.getElementById('progress-bar');
            if(levelEl) levelEl.textContent = level;
            if(expEl) expEl.textContent = exp;
            if(bar) bar.style.width = (exp/100*100)+"%";
        }
        updateProgress();
        spinBtn.onclick = function() {
            var btn = this;
            btn.disabled = true;
            btn.style.transform = 'scale(1.1) rotate(6deg)';
            var result = document.getElementById('spin-result');
            if(result) result.textContent = 'กำลังสุ่ม...';
            setTimeout(function(){
                btn.style.transform = '';
                var reward = rewards[Math.floor(Math.random()*rewards.length)];
                if(reward.type==='exp') {
                    exp += reward.value;
                    if(exp>=100) { level++; exp = exp-100; }
                    updateProgress();
                    if(result) result.textContent = reward.text;
                } else if(reward.type==='badge') {
                    var badgeArea = document.getElementById('badge-area');
                    if(badgeArea) {
                        var exists = false;
                        badgeArea.querySelectorAll('.badge').forEach(function(b){ if(b.textContent.includes(reward.value)) exists=true; });
                        if(!exists) {
                            var badge = document.createElement('span');
                            badge.className = 'badge';
                            badge.style.background = '#4caf50';
                            badge.style.color = '#fff';
                            badge.style.padding = '6px 14px';
                            badge.style.borderRadius = '8px';
                            badge.style.fontWeight = 'bold';
                            badge.style.boxShadow = '0 1px 4px #0002';
                            badge.textContent = reward.value;
                            badgeArea.appendChild(badge);
                        }
                    }
                    if(result) result.textContent = reward.text;
                }
                btn.disabled = false;
            }, 1200);
        };
    }
});
