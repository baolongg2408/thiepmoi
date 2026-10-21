/*
  THIỆP MỜI TỐT NGHIỆP — NGUYỄN THỊ YẾN NHI
  - Tên khách mời: thêm ?to=Tên_Khách hoặc ?guest=Tên_Khách vào link
    Ví dụ: index.html?to=Anh+Hoàng hoặc index.html?guest=Bạn+Thảo
  - Bản đồ: Đã ghim địa chỉ Trường Đại học Văn Hiến TP.HCM (613 Âu Cơ, P. Phú Trung, Q. Tân Phú)
  - Ảnh chủ buổi lễ: Đặt tại assets/yen-nhi.jpg
  - Nhạc nền: Đặt tại assets/graduation.mp3
*/

const CONFIG = {
  graduateName: "Nguyễn Thị Yến Nhi",
  graduateMajor: "Tân Cử Nhân · Trường Đại học Văn Hiến",
  photoUrl: "assets/yen-nhi.jpg",
  date: "2026-11-18", // Định dạng YYYY-MM-DD (Bạn có thể đổi ngày theo lịch thực tế của trường)
  time: "08:00 – 11:30",
  location: "Trường Đại học Văn Hiến (VHU)",
  address: "613 Âu Cơ, Phường Phú Trung, Quận Tân Phú, TP. Hồ Chí Minh",
  // Link bản đồ Google Maps nhúng và link chỉ đường
  mapEmbedUrl: "https://www.google.com/maps?q=Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+V%C4%83n+Hi%E1%BA%BFn,+613+%C3%82u+C%C6%A1,+Ph%C3%BA+Trung,+T%C3%A2n+Ph%C3%BA,+TP.HCM&t=&z=16&ie=UTF8&iwloc=&output=embed",
  mapDirectionUrl: "https://maps.google.com/?q=Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+V%C4%83n+Hi%E1%BA%BFn,+613+%C3%82u+C%C6%A1,+Ph%C3%BA+Trung,+T%C3%A2n+Ph%C3%BA,+H%E1%BB%93+Ch%C3%AD+Minh",
  classYear: "2026",
  musicUrl: "assets/graduation.mp3"
};

const $ = (id) => document.getElementById(id);

// 1. XỬ LÝ ĐỔI TÊN KHÁCH MỜI TỪ ĐƯỜNG LINK (URL QUERY PARAMETERS & HASH)
function getGuestNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  // Hỗ trợ nhiều dạng tham số: ?to=..., ?guest=..., ?name=..., ?ten=..., ?khach=..., ?u=...
  let rawName = params.get("to") || 
                params.get("guest") || 
                params.get("name") || 
                params.get("ten") || 
                params.get("khach") || 
                params.get("u");

  // Nếu không có trong query params, thử kiểm tra trong hash: #to=... hoặc #guest=...
  if (!rawName && window.location.hash) {
    const hash = window.location.hash.slice(1);
    const hashParams = new URLSearchParams(hash);
    rawName = hashParams.get("to") || hashParams.get("guest") || hashParams.get("name");
  }

  if (rawName) {
    try {
      // Thay dấu cộng (+) thành khoảng trắng và giải mã URI an toàn
      const decoded = decodeURIComponent(rawName.replace(/\+/g, " ")).trim();
      if (decoded.length > 0) {
        return decoded.slice(0, 80);
      }
    } catch (e) {
      console.warn("Lỗi giải mã tên khách:", e);
    }
  }

  return "Bạn thân mến";
}

const currentGuest = getGuestNameFromUrl();
$("guestOutside").textContent = currentGuest;
$("guestInside").textContent = currentGuest;
if (currentGuest && currentGuest !== "Bạn thân mến") {
  document.title = `Thư mời Lễ tốt nghiệp — Thân gửi ${currentGuest}`;
}

// 2. CẬP NHẬT THÔNG TIN CHỦ BUỔI LỄ & SỰ KIỆN
$("graduateName").textContent = CONFIG.graduateName;
$("graduateMajor").textContent = CONFIG.graduateMajor;
$("portraitName").textContent = CONFIG.graduateName;
$("portraitSub").textContent = CONFIG.graduateMajor;

const photoEl = $("graduatePhoto");
photoEl.src = CONFIG.photoUrl;
// Fallback nếu ảnh chưa tải được hoặc đường dẫn sai
photoEl.onerror = function() {
  // Hiển thị placeholder SVG thanh lịch không bị lỗi hiển thị
  this.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='533' viewBox='0 0 400 533'%3E%3Crect width='400' height='533' fill='%23fceef2'/%3E%3Ccircle cx='200' cy='210' r='60' fill='%23d99cb0'/%3E%3Cpath d='M110 390 C110 300 290 300 290 390 Z' fill='%23b56784'/%3E%3Cpolygon points='200,95 270,135 200,175 130,135' fill='%235c3b4d'/%3E%3Ctext x='200' y='460' font-family='sans-serif' font-size='16' font-weight='600' fill='%238d3f5a' text-anchor='middle'%3ENguy%E1%BB%85n Th%E1%BB%8B Y%E1%BA%BFn Nhi%3C/text%3E%3C/svg%3E";
};

$("eventTime").textContent = CONFIG.time;
$("eventLocation").textContent = CONFIG.location;
$("eventAddress").textContent = CONFIG.address;
$("yearPeek").textContent = CONFIG.classYear;
$("yearBottom").textContent = CONFIG.classYear;

// Cập nhật bản đồ Google Maps và nút chỉ đường
if ($("mapFrame")) {
  $("mapFrame").src = CONFIG.mapEmbedUrl;
}
if ($("btnDirection")) {
  $("btnDirection").href = CONFIG.mapDirectionUrl;
}

// Cập nhật ngày tháng năm
const eventDate = new Date(`${CONFIG.date}T12:00:00`);
if (!Number.isNaN(eventDate.getTime())) {
  $("dateDay").textContent = String(eventDate.getDate()).padStart(2, "0");
  $("dateMonth").textContent = `THÁNG ${eventDate.getMonth() + 1}`;
  $("dateYear").textContent = eventDate.getFullYear();
}

// 3. HIỆU ỨNG MỞ PHONG BÌ THƯ MỜI
const stage = $("invitationStage");
const content = $("letterContent");
const openButton = $("openInvite");
let opened = false;

openButton.addEventListener("click", () => {
  if (opened) return;
  opened = true;
  stage.classList.add("opening");

  // Cho hiệu ứng mở nắp phong bì diễn ra trước khi hiển thị nội dung thư
  window.setTimeout(() => {
    stage.classList.add("opened");
    content.classList.add("visible");
    content.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Bắt đầu phát nhạc ngay khi người dùng mở thư
    startMusic();
  }, 850);
});

// 4. QUẢN LÝ PHÁT NHẠC NỀN (AUDIO)
const music = $("bgMusic");
const musicToggle = $("musicToggle");
const musicLabel = $("musicLabel");
const floatingMusic = $("floatingMusic");
const toast = $("toastMessage");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3800);
}

function updateMusicUI(isPlaying) {
  if (isPlaying) {
    if (musicToggle) {
      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-pressed", "true");
      if (musicLabel) musicLabel.textContent = "Tắt nhạc nền";
    }
    if (floatingMusic) {
      floatingMusic.classList.add("playing");
      floatingMusic.setAttribute("title", "Đang phát nhạc · Bấm để tắt");
    }
  } else {
    if (musicToggle) {
      musicToggle.classList.remove("playing");
      musicToggle.setAttribute("aria-pressed", "false");
      if (musicLabel) musicLabel.textContent = "Bật nhạc nền";
    }
    if (floatingMusic) {
      floatingMusic.classList.remove("playing");
      floatingMusic.setAttribute("title", "Bật nhạc nền");
    }
  }
}

async function startMusic() {
  try {
    await music.play();
    updateMusicUI(true);
  } catch (error) {
    console.log("Autoplay bị chặn hoặc chưa sẵn sàng:", error);
    updateMusicUI(false);
    showToast("🎵 Bạn có thể bấm nút nốt nhạc góc trên để bật nhạc nền nhé!");
  }
}

function toggleMusic() {
  if (music.paused) {
    startMusic();
    showToast("🎵 Đang phát bản nhạc mừng tốt nghiệp");
  } else {
    music.pause();
    updateMusicUI(false);
    showToast("🔇 Đã tắt nhạc nền");
  }
}

if (musicToggle) {
  musicToggle.addEventListener("click", toggleMusic);
}
if (floatingMusic) {
  floatingMusic.addEventListener("click", toggleMusic);
}

// 5. HIỆU ỨNG HẠT LẤP LÁNH NỀN
const sparkleField = document.querySelector(".sparkle-field");
if (sparkleField) {
  const symbols = ["✦", "✧", "·", "✶", "✿"];
  for (let i = 0; i < 24; i++) {
    const item = document.createElement("span");
    item.className = "sparkle";
    item.textContent = symbols[i % symbols.length];
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = `${Math.random() * 100}%`;
    item.style.fontSize = `${8 + Math.random() * 9}px`;
    item.style.animationDelay = `${Math.random() * 5}s`;
    item.style.animationDuration = `${4 + Math.random() * 4}s`;
    sparkleField.appendChild(item);
  }
}
