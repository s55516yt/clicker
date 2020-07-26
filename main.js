let plyName = prompt("プレイヤーの名前を入力してください");
let flag = true;
//プレイデータ
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 10;
let plyExpNeed = [10, 20, 40, 70, 110, 160, 220, 290, 370, 460];
let plyImg = document.getElementById("plyImg");
let plySt = [
  "plySt0",
  "plySt1",
  "plySt2",
  "plySt3",
  "plySt4",
  "plySt5",
  "plySt6",
];
plySt0.textContent = plyName;
//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt2.textContent = "HP:" + plyHp;
  }
});
//敵データ
let eneLv = 1;
let eneHp = 10;
let eneHpMax0 = 10;
let eneAtt0 = 2;
let eneKill0 = 0;
let eneExp0 = 1;
let eneCnt = 5;
let eneCntMax0 = 5;
let eneImg = document.getElementById("eneImg");
let eneSt = ["eneSt0", "eneSt1", "eneSt2", "eneSt3", "eneSt4", "eneSt5"];
let eneName = [
  "スライム",
  "ゴブリン",
  "マタンゴ",
  "蜘蛛",
  "ゴースト",
  "悪魔",
  "魔術師",
  "ゴーレム",
  "ケルベロス",
  "闇騎士",
];
let right = document.getElementById("right");
let left = document.getElementById("left");
//敵を攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "img/enemyB" + eneLv + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "img/enemyA" + eneLv + ".png";
    if (eneHp > 0) {
      eneHp -= plyAtt;
      eneSt2.textContent = "HP:" + eneHp;
    }
    if (eneHp <= 0) {
      eneSt2.textContent = "HP:0";
      eneHp = eneHpMax0;
      eneKill0++;
      eneSt4.textContent = "倒した回数" + eneKill0;
      //ボスのデータ
      if (eneKill0 == 250) {
        eneImg.src = "img/enemyA100.png";
        eneSt0.textContent = "魔王";
        eneLv = 100;
        eneSt1.textContent = "レベル:" + eneLv;
        eneHpMax0 = 1000;
        eneHp = eneHpMax0;
        eneSt2.textContent = "HP:" + eneHp;
        eneAtt0 = 30;
        eneSt3.textContent = "攻撃:" + eneAtt0;
        left.textContent = "逃げられない!!";
        right.textContent = "逃げられない!!";
      }
      //ゲームクリア
      if (eneKill0 == 251) {
        clearInterval(loop);
        flag = false;
        eneSec.textContent = "ゲームクリア！！";
      }
      //経験値の処理
      plyExp += eneExp0;
      plySt5.textContent = "経験値：" + plyExp;
      plyExpNext -= eneExp0;
      //レベルアップの処理
      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        plySt1.textContent = "レベル:" + plyLv;
        plyHpMax = plyHpMax + 4;
        plyHp = plyHpMax;
        plySt2.textContent = "HP:" + plyHp;
        plyAtt++;
        plySt3.textContent = "攻撃力：" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法：" + plyHeal;
      }
      plySt6.textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
  }
});
//次のモンスターの処理
right.addEventListener("click", () => {
  if (flag) {
    if (eneLv < 10) {
      eneLv = eneLv + 1;
      eneSt1.textContent = "レベル：" + eneLv;
      eneImg.src = "img/enemyA" + eneLv + ".png";
      eneSt0.textContent = eneName[eneLv - 1];
      eneHpMax0 = eneHpMax0 + 5;
      eneHp = eneHpMax0;
      eneSt2.textContent = "HP:" + eneHp;
      eneAtt0 = eneAtt0 + 2;
      eneSt3.textContent = "攻撃力：" + eneAtt0;
      eneExp0 = eneExp0 + 1;
      eneSt5.textContent = "もらえる経験値：" + eneExp0;
    }
  }
});
//逃げるの処理
left.addEventListener("click", () => {
  if (flag) {
    if (100 < eneLv > 1) {
      eneLv = eneLv - 1;
      eneSt1.textContent = "レベル：" + eneLv;
      eneImg.src = "img/enemyA" + eneLv + ".png";
      eneSt0.textContent = eneName[eneLv - 1];
      eneHpMax0 = eneHpMax0 - 5;
      eneHp = eneHpMax0;
      eneSt2.textContent = "HP:" + eneHp;
      eneAtt0 = eneAtt0 - 2;
      eneSt3.textContent = "攻撃力：" + eneAtt0;
      eneExp0 = eneExp0 - 1;
      eneSt5.textContent = "もらえる経験値：" + eneExp0;
    }
  }
});
//敵が時間ごとに攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (eneCnt > 0) {
    eneCnt--;
    eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
  } else {
    plyImg.src = "img/playerB.png";
    plyHp -= eneAtt0;
    if (plyHp > 0) {
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        eneCnt = eneCntMax0;
        plyImg.src = "img/playerA.png";
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
      }
    }, 500);
  }
}, 1000);
