// REVENGE 4 YOU — translations
// The logo "REVENGE 4 YOU!" stays in English in every language.
const LANGS = {
  en: { name: 'English', dir: 'ltr', locale: 'en-GB' },
  he: { name: 'עברית', dir: 'rtl', locale: 'he-IL' },
  ar: { name: 'العربية', dir: 'rtl', locale: 'ar-u-nu-latn' },
  ru: { name: 'Русский', dir: 'ltr', locale: 'ru-RU' },
};

const STR = {
  en: {
    install_title: 'Install app', install_btn: '📲 Install Revenge 4 You', install_hint: 'Put the app on your home screen / desktop. It works offline too.', install_ios: 'On iPhone: tap Share ⬆️ and then “Add to Home Screen”.', install_other: 'Open your browser menu (⋮) and choose “Install app” or “Add to Home screen”.',
    theme: 'Design', theme_hint: 'Choose how the app looks.', th_original: '💥 Original', th_office: '💼 Office',
    menu_new: 'New Revenge', menu_active: 'Active Revenges', menu_fav: 'Favorites', menu_archive: 'Archive', settings: 'Settings',
    who: 'Who are you taking revenge on?', type_name: 'Type a name…', add_another: 'Add another…',
    many_people: 'Add as many people as you want.', picture: 'Picture', optional: '(optional)', upload_pic: 'Upload a picture',
    remove_pic: 'Remove picture', what_do: 'What will you do?', describe_plan: 'Describe the plan…', create: 'Create Revenge',
    err_person: 'Add at least one person.', err_plan: 'Write what you will do.', err_not_pic: 'That file is not a picture.',
    storage_full: 'Storage is full — try a smaller picture or delete some old revenges.',
    empty_active: 'No active revenges… for now.', empty_fav: 'Tap the star on any revenge to add it here.',
    empty_archive: 'Closed and canceled revenges show up here.',
    started: 'Started {d}', completed: 'Completed {d}', canceled: 'Canceled {d}', add_new: 'Add “{n}”', remove: 'Remove {n}',
    st_active: '🔥 ACTIVE', st_done: '✔ COMPLETED', st_canceled: '✖ CANCELED', sticker: 'CANCELED',
    target: 'Target', targets: 'Targets', plan: 'The plan', started_lbl: 'Started', completed_lbl: 'Completed',
    canceled_lbl: 'Canceled', how_went: 'How it went',
    close_btn: '✔ Close (done!)', fav: '☆ Favorite', unfav: '★ Unfavorite', delete_btn: '✖ Delete',
    how_q: 'How did it go? What happened?', tell_story: 'Tell the story… (optional)', save_close: '✔ Save & close revenge', back: 'Back',
    confirm_cancel: 'Delete this revenge? It will move to the archive marked CANCELED.',
    display: 'Display', display_hint: 'How the app looks on this device.', auto: '🔄 Auto', phone: '📱 Phone', computer: '💻 Computer',
    language: 'Language', language_hint: 'Choose the app language.',
    data: 'Data', none_saved: 'No revenges saved yet.', delete_all: '🗑 Delete everything',
    count: n => n === 1 ? 'You have 1 revenge saved.' : `You have ${n} revenges saved.`,
    people: n => n === 1 ? '1 remembered person.' : `${n} remembered people.`,
    confirm_wipe: 'Delete ALL revenges and remembered people? This cannot be undone.',
  },
  he: {
    install_title: 'התקנת האפליקציה', install_btn: '📲 התקנת Revenge 4 You', install_hint: 'שמים את האפליקציה במסך הבית או בשולחן העבודה. היא עובדת גם בלי אינטרנט.', install_ios: 'באייפון: לוחצים על שיתוף ⬆️ ואז „הוספה למסך הבית”.', install_other: 'פותחים את התפריט של הדפדפן (⋮) ובוחרים „התקנת אפליקציה” או „הוספה למסך הבית”.',
    theme: 'עיצוב', theme_hint: 'בחרו איך האפליקציה נראית.', th_original: '💥 מקורי', th_office: '💼 משרדי',
    menu_new: 'נקמה חדשה', menu_active: 'נקמות פעילות', menu_fav: 'מועדפים', menu_archive: 'ארכיון', settings: 'הגדרות',
    who: 'על מי נוקמים?', type_name: 'הקלידו שם…', add_another: 'להוסיף עוד מישהו…',
    many_people: 'אפשר להוסיף כמה אנשים שרוצים.', picture: 'תמונה', optional: '(לא חובה)', upload_pic: 'העלאת תמונה',
    remove_pic: 'הסרת התמונה', what_do: 'מה התוכנית?', describe_plan: 'תארו מה תעשו…', create: 'יצירת נקמה',
    err_person: 'צריך להוסיף לפחות אדם אחד.', err_plan: 'צריך לכתוב מה התוכנית.', err_not_pic: 'הקובץ הזה הוא לא תמונה.',
    storage_full: 'האחסון מלא — נסו תמונה קטנה יותר או מחקו נקמות ישנות.',
    empty_active: 'אין נקמות פעילות… בינתיים.', empty_fav: 'לחצו על הכוכב בנקמה כדי להוסיף אותה לכאן.',
    empty_archive: 'נקמות שנסגרו או בוטלו יופיעו כאן.',
    started: 'התחילה {d}', completed: 'הושלמה {d}', canceled: 'בוטלה {d}', add_new: 'הוספת „{n}”', remove: 'הסרת {n}',
    st_active: '🔥 פעילה', st_done: '✔ הושלמה', st_canceled: '✖ בוטלה', sticker: 'בוטל',
    target: 'על מי', targets: 'על מי', plan: 'התוכנית', started_lbl: 'התחילה', completed_lbl: 'הושלמה',
    canceled_lbl: 'בוטלה', how_went: 'איך זה הלך',
    close_btn: '✔ סגירה (בוצע!)', fav: '☆ למועדפים', unfav: '★ הסרה ממועדפים', delete_btn: '✖ מחיקה',
    how_q: 'איך זה הלך? מה קרה?', tell_story: 'ספרו מה קרה… (לא חובה)', save_close: '✔ שמירה וסגירת הנקמה', back: 'חזרה',
    confirm_cancel: 'למחוק את הנקמה? היא תעבור לארכיון עם מדבקת „בוטל”.',
    display: 'תצוגה', display_hint: 'איך האפליקציה נראית במכשיר הזה.', auto: '🔄 אוטומטי', phone: '📱 טלפון', computer: '💻 מחשב',
    language: 'שפה', language_hint: 'בחרו את שפת האפליקציה.',
    data: 'נתונים', none_saved: 'עוד אין נקמות שמורות.', delete_all: '🗑 מחיקת הכול',
    count: n => n === 1 ? 'נשמרה נקמה אחת.' : `נשמרו ${n} נקמות.`,
    people: n => n === 1 ? 'אדם אחד שמור.' : `${n} אנשים שמורים.`,
    confirm_wipe: 'למחוק את כל הנקמות ואת כל האנשים השמורים? אי אפשר לבטל את זה.',
  },
  ar: {
    install_title: 'تثبيت التطبيق', install_btn: '📲 تثبيت Revenge 4 You', install_hint: 'ضع التطبيق على الشاشة الرئيسية أو سطح المكتب. يعمل بدون إنترنت أيضًا.', install_ios: 'على الآيفون: اضغط مشاركة ⬆️ ثم «إضافة إلى الشاشة الرئيسية».', install_other: 'افتح قائمة المتصفح (⋮) واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».',
    theme: 'التصميم', theme_hint: 'اختر شكل التطبيق.', th_original: '💥 الأصلي', th_office: '💼 مكتبي',
    menu_new: 'انتقام جديد', menu_active: 'انتقامات نشطة', menu_fav: 'المفضلة', menu_archive: 'الأرشيف', settings: 'الإعدادات',
    who: 'ممّن ستنتقم؟', type_name: 'اكتب اسمًا…', add_another: 'أضف شخصًا آخر…',
    many_people: 'يمكنك إضافة أي عدد من الأشخاص.', picture: 'صورة', optional: '(اختياري)', upload_pic: 'رفع صورة',
    remove_pic: 'إزالة الصورة', what_do: 'ماذا ستفعل؟', describe_plan: 'صف الخطة…', create: 'إنشاء الانتقام',
    err_person: 'أضف شخصًا واحدًا على الأقل.', err_plan: 'اكتب ماذا ستفعل.', err_not_pic: 'هذا الملف ليس صورة.',
    storage_full: 'المساحة ممتلئة — جرّب صورة أصغر أو احذف انتقامات قديمة.',
    empty_active: 'لا توجد انتقامات نشطة… حتى الآن.', empty_fav: 'اضغط على النجمة في أي انتقام لإضافته هنا.',
    empty_archive: 'الانتقامات المغلقة والملغاة تظهر هنا.',
    started: 'بدأ {d}', completed: 'اكتمل {d}', canceled: 'أُلغي {d}', add_new: 'إضافة «{n}»', remove: 'إزالة {n}',
    st_active: '🔥 نشط', st_done: '✔ مكتمل', st_canceled: '✖ ملغى', sticker: 'ملغى',
    target: 'الهدف', targets: 'الأهداف', plan: 'الخطة', started_lbl: 'البداية', completed_lbl: 'الاكتمال',
    canceled_lbl: 'الإلغاء', how_went: 'كيف جرى الأمر',
    close_btn: '✔ إغلاق (تم!)', fav: '☆ إلى المفضلة', unfav: '★ إزالة من المفضلة', delete_btn: '✖ حذف',
    how_q: 'كيف جرى الأمر؟ ماذا حدث؟', tell_story: 'احكِ القصة… (اختياري)', save_close: '✔ حفظ وإغلاق الانتقام', back: 'رجوع',
    confirm_cancel: 'حذف هذا الانتقام؟ سينتقل إلى الأرشيف بعلامة «ملغى».',
    display: 'العرض', display_hint: 'كيف يظهر التطبيق على هذا الجهاز.', auto: '🔄 تلقائي', phone: '📱 هاتف', computer: '💻 حاسوب',
    language: 'اللغة', language_hint: 'اختر لغة التطبيق.',
    data: 'البيانات', none_saved: 'لا توجد انتقامات محفوظة بعد.', delete_all: '🗑 حذف كل شيء',
    count: n => `الانتقامات المحفوظة: ${n}.`,
    people: n => `الأشخاص المحفوظون: ${n}.`,
    confirm_wipe: 'حذف كل الانتقامات وكل الأشخاص المحفوظين؟ لا يمكن التراجع عن ذلك.',
  },
  ru: {
    install_title: 'Установка', install_btn: '📲 Установить Revenge 4 You', install_hint: 'Добавьте приложение на главный экран или рабочий стол. Работает и без интернета.', install_ios: 'На iPhone: нажмите «Поделиться» ⬆️, затем «На экран Домой».', install_other: 'Откройте меню браузера (⋮) и выберите «Установить приложение».',
    theme: 'Оформление', theme_hint: 'Выберите вид приложения.', th_original: '💥 Оригинал', th_office: '💼 Офисный',
    menu_new: 'Новая месть', menu_active: 'В процессе', menu_fav: 'Избранное', menu_archive: 'Архив', settings: 'Настройки',
    who: 'Кому мстим?', type_name: 'Введите имя…', add_another: 'Добавить ещё…',
    many_people: 'Можно добавить сколько угодно людей.', picture: 'Фото', optional: '(необязательно)', upload_pic: 'Загрузить фото',
    remove_pic: 'Убрать фото', what_do: 'Что будете делать?', describe_plan: 'Опишите план…', create: 'Создать месть',
    err_person: 'Добавьте хотя бы одного человека.', err_plan: 'Напишите, что будете делать.', err_not_pic: 'Этот файл — не изображение.',
    storage_full: 'Память заполнена — выберите фото поменьше или удалите старые записи.',
    empty_active: 'Активной мести нет… пока.', empty_fav: 'Нажмите на звезду, чтобы добавить сюда.',
    empty_archive: 'Здесь появятся завершённые и отменённые.',
    started: 'Начато {d}', completed: 'Завершено {d}', canceled: 'Отменено {d}', add_new: 'Добавить «{n}»', remove: 'Убрать {n}',
    st_active: '🔥 АКТИВНО', st_done: '✔ ЗАВЕРШЕНО', st_canceled: '✖ ОТМЕНЕНО', sticker: 'ОТМЕНЕНО',
    target: 'Цель', targets: 'Цели', plan: 'План', started_lbl: 'Начато', completed_lbl: 'Завершено',
    canceled_lbl: 'Отменено', how_went: 'Как всё прошло',
    close_btn: '✔ Закрыть (готово!)', fav: '☆ В избранное', unfav: '★ Убрать из избранного', delete_btn: '✖ Удалить',
    how_q: 'Как всё прошло? Что случилось?', tell_story: 'Расскажите… (необязательно)', save_close: '✔ Сохранить и закрыть', back: 'Назад',
    confirm_cancel: 'Удалить эту месть? Она уйдёт в архив с пометкой «ОТМЕНЕНО».',
    display: 'Экран', display_hint: 'Как приложение выглядит на этом устройстве.', auto: '🔄 Авто', phone: '📱 Телефон', computer: '💻 Компьютер',
    language: 'Язык', language_hint: 'Выберите язык приложения.',
    data: 'Данные', none_saved: 'Пока ничего не сохранено.', delete_all: '🗑 Удалить всё',
    count: n => `Сохранено записей: ${n}.`,
    people: n => `Запомнено людей: ${n}.`,
    confirm_wipe: 'Удалить все записи и всех запомненных людей? Это нельзя отменить.',
  },
};

let lang = 'en';
try { const s = localStorage.getItem('revenge4u.lang'); if (STR[s]) lang = s; } catch {}

function t(key, vars) {
  const v = STR[lang][key] ?? STR.en[key] ?? key;
  if (typeof v === 'function') return v(vars);
  return vars && typeof vars === 'object' ? v.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '') : v;
}

// fills every element marked with data-i18n / data-i18n-ph / data-i18n-aria
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = LANGS[lang].dir;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
}
