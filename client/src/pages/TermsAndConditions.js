
// Main Terms and Conditions page component
import React, { Fragment } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";


const TermsAndConditions = () => {

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

const arabicSections = [
  {
    title: "1. التعريفات والمصطلحات الأساسية",
    content: [
      "يمثل مصطلح \"ضالتي\" المنصة الإلكترونية المملوكة والمشغَّلة من قبل شركة حلة ذكية لتقنية المعلومات لتقديم خدمات الإبلاغ عن المفقودات والمعثورات.",
      "يقصد بعبارة \"الخدمة\" أي خدمات مقدمة من خلال موقع ضالتي أو تطبيقاته أو القنوات المرتبطة به.",
      "القوة القاهرة: أي فعل أو حدث يتجاوز السيطرة العادية ولا يمكن تجنّبه أو التنبؤ به وفق الظروف العادية.",
      "حقوق الملكية الفكرية: تشمل النصوص والتصاميم والرسومات والمحتوى والبرمجيات والعلامات التجارية والشعارات وأي مواد أخرى يملكها أو يرخّصها ضالتي."
    ]
  },
  {
    title: "2. نطاق الخدمة والوصف",
    content: [
      "تمنحك ضالتي ترخيصًا محدودًا، غير حصري، غير قابل للتحويل أو التنازل، للوصول إلى الخدمة واستخدامها وفق هذه الشروط.",
      "باستخدامك للخدمة، فإنك تقر بالتزامك الكامل لهذه الشروط، وفي حال عدم قبولها يجب التوقف عن الاستخدام.",
      "تنطبق هذه الشروط فقط على الخدمات المقدمة من ضالتي، وقد يتضمن موقعنا روابط لخدمات طرف ثالث لا نتحمّل مسؤوليتها.",
      <Fragment key="site-link-ar">
        الموقع الإلكتروني الرسمي:{" "}
        <a href="https://dhallaty.sa" target="_blank" rel="noopener noreferrer">
          https://dhallaty.sa
        </a>
      </Fragment>
    ]
  },
  {
    title: "2.1 آلية نموذج العمل",
    content: [
      "تُتاح خدمة ضالتي في جميع أنحاء المملكة العربية السعودية داخل البيئات المفتوحة والمغلقة (مثل المجمعات التجارية والجامعات وغيرها).",
      "تُمكّن المنصة أي شخص من الإبلاغ عن غرض معثور أو مفقود عبر نموذج بلاغ يتم حفظ بياناته بأمان في قاعدة البيانات.",
      "تستخدم المنصة تقنيات الذكاء الاصطناعي لمطابقة بلاغات المفقودات مع بلاغات المعثورات، وإرسال تنبيه من قبل موظفي ضالتي لصاحب الغرض المفقود عند وجود تطابق محتمل.",
      "بعد إتمام التسليم بنجاح، تُغيَّر حالة البلاغ إلى \"تم تسليمه\" ويُؤرشف تلقائيًا. كما تُحدَّث البيانات آليًا لضمان الدقة، وتُؤرشف البلاغات التي مرّ عليها أكثر من 90 يومًا."
    ]
  },
  {
    title: "2.2 إرشادات وخطوات الإبلاغ عن غرض معثور",
    content: [
      "1) تسليم الغرض لجهة مسؤولة عن المفقودات في الموقع (مثل موظف أمن أو مسؤول المفقودات، إن وجد).",
      "2) الدخول إلى موقع ضالتي واختيار “الإبلاغ عن غرض معثور عليه” ورفع البلاغ.",
      "3) إنشاء حساب (إن لم يكن لديك حساب سابق).",
      "4) الانضمام تلقائيًا إلى عضوية سفراء ضالتي، والتمتع بمزايا العضوية."
    ]
  },
  {
    title: "2.3 إرشادات وخطوات الإبلاغ عن غرض مفقود",
    content: [
      "1) الدخول إلى موقع ضالتي واختيار “الإبلاغ عن غرض مفقود” ورفع البلاغ.",
      "2) إنشاء حساب (إن لم يكن لديك حساب سابق).",
      "3) متابعة حالة البلاغ؛ وعند حدوث تطابق آلي سيظهر تنبيه للمستخدم دون إظهار بيانات البلاغ الآخر الشخصية.",
      "4) تأكيد التطابق يدويًا ودفع الرسوم (إن وُجدت) لإظهار تفاصيل موقع استلام الغرض.",
      "5) بعد الدفع، تظهر معلومات مكان الغرض لاستلامه وفق الإرشادات المحددة."
    ]
  },
  {
    title: "2.4 إيضاحات تنظيمية مهمة",
    content: [
      "أ) ضالتي خدمة إلكترونية حصراً وليست خدمة لوجستية أو تخزين؛ ولا تتولّى نقل أو حفظ الأغراض.",
      "ب) الأغراض التي يتم العثور عليها لا تُخزَّن ولا تُدار ماديًا بواسطة ضالتي بأي شكل؛ وأي تواصل بخصوص التسليم يتم عبر الجهات المشغلة.",
      "ج) تُدار عمليات المطابقة والإشعارات والأرشفة بشكل آلي و/أو يدوي من قبل موظفي ضالتي بهدف تحسين تجربة المستخدم وتجنّب المشاكل المستقبلية.",
      "د) ضالتي ليست طرفًا شريكًا أو مشغلاً للأماكن التي يُبلّغ فيها (سواءً عامة أو خاصة)، ولا تتحمّل مسؤولية ما يقع ضمن نطاق إدارة تلك الجهات."
    ]
  },
  {
    title: "3. المدة والإنهاء",
    content: [
      "تظل هذه الشروط سارية حتى تقوم أنت أو ضالتي بإنهائها. تحتفظ ضالتي بالحق في تعليق أو إنهاء الوصول للخدمة في أي وقت ودون إشعار في حال مخالفة الشروط.",
      "يمكنك إنهاء الاستخدام بحذف الموقع/التطبيق وجميع الملفات المرتبطة به من جهازك، والتوقف عن استخدام الخدمة."
    ]
  },
  {
    title: "4. الخدمات الخارجية (الطرف الثالث)",
    content: [
      "قد تتيح ضالتي الوصول إلى محتوى أو خدمات طرف ثالث. استخدامك لها يكون على مسؤوليتك ويخضع لشروط مقدّميها. ضالتي غير مسؤولة عن دقة أو قانونية أو جودة تلك الخدمات."
    ]
  },
  {
    title: "5. المسؤولية",
    content: [
      "لا تتحمّل ضالتي في أي حال المسؤولية عن أي أضرار مباشرة أو غير مباشرة أو تبعية تنشأ عن استخدامك للخدمة أو عدم القدرة على استخدامها، بما في ذلك فقدان البيانات أو الأرباح.",
      "إذا أدّى استخدامك للموقع إلى الحاجة لصيانة أو إصلاح أو تصحيح أي أجهزة أو بيانات، فأنت تتحمل وحدك جميع الأعمال عن هذه الصيانة الناجمة.",
      "تحتفظ ضالتي بالحق في تعديل الأسعار أو سياسات الاستخدام في أي وقت دون إشعار مسبق."
    ]
  },
  {
    title: "6. تحديد المسؤولية",
    content: [
      "في حال تكبّدك أي أضرار نتيجة استخدام الموقع، فإن الحد الأقصى لمسؤولية ضالتي تجاهك يساوي المبلغ الذي دفعته مقابل استخدام الخدمة (إن وُجد).",
      "لا تتحمل ضالتي أو مورّدوها أي مسؤولية عن خسارة الأرباح أو البيانات أو انقطاع العمل أو فقدان الخصوصية أو الإصابة الشخصية أو أي أضرار تبعية أخرى، حتى وإن تم التحذير من احتمال وقوعها."
    ]
  },
  {
    title: "7. الدفع",
    content: [
      "قد تتطلّب بعض الخدمات اشتراكًا أو رسوماً. بتقديم معلومات الدفع، فإنك تفوّض ضالتي بالتحقّق وخصم الرسوم المستحقة.",
      "أنت مسؤول عن تحديث بيانات الفوترة وإشعارنا فورًا بأي تغيير."
    ]
  },
  {
    title: "8. سياسة الإرجاع واسترداد المبالغ",
    content: [
      "تخضع جميع الطلبات المقدّمة عبر منصتنا لهذه الشروط وسياسة الخصوصية. بإتمام أي عملية، فإنك تؤكد قبولك بالسياسات المعمول بها.",
      "نسعى لمعالجة الشكاوى بسرعة ورضا معقولين عبر دعم العملاء.",
      "تنبيه مهم: لا يمكن استرجاع المبلغ بعد تأكيد عملية المطابقة وإظهار موقع الاستلام. إلا في حالات محددة يعود تقديرها لضالتي."
    ]
  },
  {
    title: "9. إيقاف الخدمة وتحديث الصفحة",
    content: [
      "يجوز لضالتي، وفق تقديرها الخاص وبدون إشعار مسبق، إيقاف تقديم الخدمة مؤقتًا أو دائمًا كله أو جزءًا منه. وإذا تم تعطيل حسابك، فقد تفقد إمكانية الوصول إلى البيانات المخزنة.",
      "سيتم نشر أي تحديثات تطرأ على هذه الصفحة مع ذكر تاريخ آخر تعديل."
    ]
  },
  {
    title: "10. التعديلات على الشروط والأحكام",
    content: [
      "يجوز لنا تعديل هذه الشروط في أي وقت. وإذا كانت التغييرات جوهرية فسنبلغك قبل 15 يومًا على الأقل من بدء سريانها. استمرارك في استخدام الموقع بعد السريان يعني موافقتك على الشروط الجديدة."
    ]
  },
  {
    title: "11. الشروط والأحكام الكاملة",
    content: [
      "تشكل هذه الشروط وسياسة الخصوصية وأي إشعارات قانونية أخرى الاتفاق الكامل والنهائي بينك وبين ضالتي بخصوص استخدام الموقع، وتلغي أي اتفاقات سابقة."
    ]
  },
  {
    title: "12. تحديثات على الشروط",
    content: [
      "قد نقوم بتحديث خدماتنا أو سياساتنا من وقت لآخر. سنعلمك وفق المتطلبات النظامية ونمنحك فرصة لمراجعة الشروط المحدّثة؛ وإذا لم توافق يمكنك حذف حسابك."
    ]
  },
  {
    title: "13. تعديلات على الموقع",
    content: [
      "نحتفظ بالحق في تعديل أو تعليق أو إيقاف أي جزء من الموقع أو خدماته في أي وقت دون إشعار أو مسؤولية."
    ]
  },
  {
    title: "14. تحديثات الموقع",
    content: [
      "قد نصدر تحديثات لتحسين الوظائف أو إصلاح الأخطاء أو إضافة ميزات جديدة، وقد تؤدي التحديثات إلى إزالة أو تغيير بعض الميزات الحالية."
    ]
  },
  {
    title: "15. الملكية الفكرية",
    content: [
      "جميع المحتويات على الموقع بما في ذلك النصوص والتصاميم والرسومات والبرمجيات والفيديوهات والصوتيات مملوكة لضالتي أو الجهات المرخّصة لها ومحميّة بموجب قوانين الملكية الفكرية في السعودية وعلى الصعيد الدولي.",
      "لا يجوز نسخ أو تعديل أو إعادة إنتاج أو توزيع أي جزء من المحتوى دون إذن كتابي مسبق من ضالتي. في حال إدعاء انتهاك حقوق نشر، يرجى التواصل معنا بالمعلومات اللازمة لإزالة المحتوى المخالف."
    ]
  },
  {
    title: "16. عدم تقديم ضمانات",
    content: [
      "يتم تقديم الموقع والخدمة \"كما هي\" و\"كما هي متاحة\" دون أي ضمانات صريحة أو ضمنية، بما في ذلك ضمانات القابلية للتسويق أو الملاءمة لغرض معيّن أو عدم الانتهاك.",
      "لا نضمن خلو الخدمة من الأخطاء أو الانقطاعات أو الفيروسات، ولا نضمن إصلاح أي مشكلات."
    ]
  },
  {
    title: "17. التنازل",
    content: [
      "لا يُعدّ عدم ممارسة أي حق أو تأخّر في ممارسته تنازلاً عنه. والتنازل عن خرق واحد لا يعد تنازلاً عن أي خروقات لاحقة."
    ]
  },
  {
    title: "18. تسوية النزاعات",
    content: [
      "ينطبق هذا القسم على أي خلاف يتعلق بالموقع أو بهذه الشروط. يجب إرسال \"إشعار نزاع\" كتابي يتضمن بيانات التواصل ووصف النزاع والحل المطلوب إلى: admin@dhallaty.sa.",
      "سيحاول الطرفان تسوية النزاع وديًا خلال 60 يومًا، وفي حال تعذر ذلك تُرفع الدعوى إلى المحكمة المختصة في المملكة العربية السعودية."
    ]
  },
  {
    title: "19. العروض الترويجية",
    content: [
      "قد تقدم ضالتي من وقت لآخر مسابقات أو سحوبات أو عروضًا ترويجية خاضعة لشروط أهلية منفصلة. تقع على عاتقك مسؤولية مراجعتها والتأكد من أهليتك قبل المشاركة."
    ]
  },
  {
    title: "20. إخلاء المسؤولية",
    content: [
      "ضالتي غير مسؤولة عن أي أخطاء أو عدم دقّة في المحتوى أو الشيفرة البرمجية، ولا تتحمل أي أضرار مباشرة أو غير مباشرة أو تبعية نتيجة استخدام الخدمة أو محتواها.",
      "نحتفظ بالحق في تعديل أو حذف أي محتوى في أي وقت دون إشعار."
    ]
  },
  {
    title: "21. الشروط العامة",
    content: [
      "تشكل هذه الشروط اتفاقًا قانونيًا بينك وبين ضالتي. باستخدامك للموقع أو إتمامك أي طلب، فإنك توافق على هذه الشروط وسياسة الخصوصية.",
      "إذا اعتُبر أي بند غير صالح أو غير قابل للتنفيذ فسيتم تعديله بالقدر اللازم وتظل بقية البنود سارية.",
      "نحتفظ بالحق في رفض أو إلغاء أي طلب تم إدخاله بمعلومات أو بأسعار غير صحيحة بسبب خطأ مطبعي، مع ردّ المبلغ فورًا إلى وسيلة الدفع الأصلية."
    ]
  },
  {
    title: "22. تقديم المقترحات",
    content: [
      "أي أفكار أو اقتراحات أو تعليقات تقدمها بشأن التطبيق أو الخدمة تظل ملكًا لضالتي ويجوز استخدامها أو تعديلها أو نشرها دون التزام بتعويضك."
    ]
  },
  {
    title: "23. التواصل معنا",
    content: [
      <Fragment key="contact-ar">
        إذا كانت لديك أي أسئلة، يرجى التواصل عبر بريدنا الإلكتروني:{" "}
        <a href="mailto:support@dhallaty.sa">support@dhallaty.sa</a>{" "}
        أو عبر موقعنا:{" "}
        <a href="https://dhallaty.sa" target="_blank" rel="noopener noreferrer">
          https://dhallaty.sa
        </a>
        .
      </Fragment>
    ]
  }
];

  const pageTitle = isArabic ? "الشروط والأحكام – ضالتي" : "Terms and Conditions - Dhallaty";
  const lastUpdate = isArabic ? "آخر تحديث: 13 سبتمبر 2025" : "Last update: 8th September 2025";

  return (
    <Box sx={{ bgcolor: "#f8fafb", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4 }}>
        
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom sx={{ fontFamily: 'inherit' }}>
            {pageTitle}
          </Typography>
          
          <Typography variant="subtitle2" align="center" color="text.secondary" gutterBottom>
            {lastUpdate}
          </Typography>
          <Box sx={{ mt: 4 }}>
           
            {isArabic ? (
              arabicSections.map((section, idx) => (
                <Box key={idx} sx={{ mb: 3, direction: "rtl", textAlign: "right" }}>
                 
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {section.title}
                  </Typography>
                  {section.content.map((p, i) => (
                    <Typography key={i} paragraph component={typeof p === 'string' ? 'p' : 'span'}>
                      {p}
                    </Typography>
                  ))}
                </Box>
              ))
            ) : (

              <Fragment>
               
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  1. Definitions and Basic Terms
                </Typography>
                <Typography paragraph>
                  The term “Dhallaty” represents the electronic platform owned and operated by Hilla Smart Information Technology Company to provide missing and found reporting services.
                </Typography>
                <Typography paragraph>
                  The terms “Service” means any services provided through Dhallaty website, its applications or associated channels.
                </Typography>
                <Typography paragraph>
                  Force majeure: Any action or event that exceeds normal control and cannot be avoided or predicted under normal circumstances.
                </Typography>
                <Typography paragraph>
                  Intellectual Property Rights: include the texts, designs, graphics, content, software, trademarks, logos, and any other materials owned or licensed by Dhallaty.
                </Typography>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                  2. Service Scope and Description
                </Typography>
                <Typography paragraph>
                  Dhallaty grants you a limited, non-exclusive, non-transferable or assignable license to access and use the Service in accordance with these Terms and Conditions.
                </Typography>
                <Typography paragraph>
                  By using the Service, you acknowledge your full compliance with these Terms, and if you do not accept them, you must stop using them.
                </Typography>
                <Typography paragraph>
                  These terms apply only to the services provided by Dhallaty, and our website may include links to third party services for which not under our liability.
                </Typography>
                <Typography paragraph>
                  Official website: <a href="https://dhallaty.sa" target="_blank" rel="noopener noreferrer">https://dhallaty.sa</a>
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                  2.1. Business model mechanism
                </Typography>
                <Typography paragraph>
                  Dhallaty service is available throughout Saudi Arabia within open and closed environments (such as shopping malls, universities, etc.).
                </Typography>
                <Typography paragraph>
                  The platform enables anyone to report a found or missing item via a report form whose data is securely saved in the database.
                </Typography>
                <Typography paragraph>
                  The platform uses artificial intelligence technologies to match missing information reports with found information reports and sends an alert by Dhallaty staff to the owner of the missing item when there is a potential match.
                </Typography>
                <Typography paragraph>
                  After successful delivery, the report status is changed to "Delivered" and automatically archived. Data is also updated automatically to ensure accuracy, and reports that are more than 90 days old are archived.
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                  2.2. Guidelines and steps for reporting a found item
                </Typography>
                <Typography component="div" paragraph>
                  1) Handing over the item to an entity responsible for lost items on site (such as a security officer or lost items officer, if any)<br />
                  2) Log in to the Dhallaty website, choose "Report a found item" and file the report.<br />
                  3) Create an account (if you do not have a previous account.)<br />
                  4) Automatically join the membership of Dhallaty ambassadors and enjoy the benefits of membership.
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                  2.3. Guidelines and steps for reporting a missing item
                </Typography>
                <Typography component="div" paragraph>
                  1) Log in to the Dhallaty website, choose "Report a missing item" and file a report.<br />
                  2) Create an account (if you do not have a previous account.)<br />
                  3) Follow up on the status of the report; When an automatic match occurs, an alert will appear to the user without showing the other report's personal data.<br />
                  4) Manually confirm the match and pay the fee (if applicable) to show details of the purpose receipt location.<br />
                  5) After payment, information about the location of the item appears for receipt according to the specified instructions.
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                  2.4. Important organizational clarifications
                </Typography>
                <Typography component="div" paragraph>
                  a) Dhallaty has the exclusively an electronic service, not a logistics or storage service; it does not transport or store items.<br />
                  b) The items found are not stored or physically managed by Dhallaty in any way; any communication regarding delivery takes place through the operators.<br />
                  c) Matching, notifications, and archiving are managed automatically and/or manually by Dhallaty staff to improve the user experience and avoid future problems.<br />
                  d) Dhallaty is not a partner party or operator of the places where it is reported (whether public or private) and does not bear responsibility for what falls within the scope of the management of those entities.
                </Typography>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              3. Term and Termination
            </Typography>
            <Typography paragraph>
              These Terms shall remain in effect until you or Dhallaty terminate them. Dhallaty reserves the right to suspend or terminate access to the service at any time and without notice in the event of a violation of the Terms.
            </Typography>
            <Typography paragraph>
              You may terminate use by deleting the website/App and all associated files from your device and stopping use of the service.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              4. External Services (Third Party)
            </Typography>
            <Typography paragraph>
              Dhallaty may provide access to third party content or services. Your use of it is at your own risk and subject to the terms of its providers. My claim is not responsible for the accuracy, legality or quality of those services.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              5. Liability
            </Typography>
            <Typography paragraph>
              In no event shall Dhallaty be liable for any direct, indirect or consequential damages arising from your use of or inability to use the service, including loss of data or profits.
            </Typography>
            <Typography paragraph>
              If your use of the website results in the need to maintain, repair or correct any devices or data, you alone bear all work for such resulting maintenance.   
            </Typography>
            <Typography paragraph>
              Dhallaty reserves the right to modify prices or usage policies at any time without prior notice.
            </Typography>
            <Typography paragraph>
              The service operates within the borders of the Kingdom of Saudi Arabia; if you access the service from outside Saudi Arabia, you are responsible for ensuring that your use complies with local laws.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              6. Determine Liability
            </Typography>
            <Typography paragraph>
              If you suffer any damages as a result of using the website, the maximum liability of Dhallaty to you is equal to the amount you paid for using the service (if any).
            </Typography>
            <Typography paragraph>
              Neither Dhallaty nor its suppliers shall be liable for loss of profits or data, business interruption, loss of privacy, personal injury or any other consequential damages, even if warned of the possibility of them occurring.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              7. Payment
            </Typography>
            <Typography paragraph>
              Some services may require a subscription or fee. By providing payment information, you authorize Dhallaty to verify and deduct the fees due.
            </Typography>
            <Typography paragraph>
              You are responsible for updating your billing information and notifying us immediately of any change.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              8. Return and Refund Policy
            </Typography>
            <Typography paragraph>
              All orders placed through our platform are subject to these Terms and Privacy Policy. By completing any transaction, you confirm your acceptance of the applicable policies.
            </Typography>
            <Typography paragraph>
              We strive to process complaints quickly and with reasonable satisfaction through customer support.
            </Typography>
            <Typography paragraph>
              Important notice: The amount cannot be refunded after confirming the matching process and showing the receipt location. Except in specific cases, it is estimated by Dhallaty
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              9. Suspend the Service and Refresh the Page
            </Typography>
            <Typography paragraph>
              Dhallaty may, at its sole discretion and without prior notice, temporarily or permanently discontinue all or part of the provision of the service. If your account is disabled, you may lose access to stored data.
            </Typography>
            <Typography paragraph>
              Any updates to this page will be posted with the date they were last modified.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              10. Modifications on the Terms and Conditions
            </Typography>
            <Typography paragraph>
              We may amend these Terms at any time. If the changes are substantive, we will notify you at least 15 days before they take effect. Your continued use of the website after its entry into force means you agree to the new terms.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              11. Full Terms and Conditions
            </Typography>
            <Typography paragraph>
              These Terms, Privacy Policy and any other legal notices constitute the entire and final agreement between you and Dhallaty regarding the use of the website, and supersede any prior agreements.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              12. Updates on the Terms and Conditions
            </Typography>
            <Typography paragraph>
              We may update our services or policies from time to time. We will notify you according to regulatory requirements and give you the opportunity to review the updated terms; if you do not agree, you may delete your account.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              13. Modifications on the Website
            </Typography>
            <Typography paragraph>
              We reserve the right to modify, suspend or discontinue any part of the website or its services at any time without notice or liability.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              14. Updates on the Website
            </Typography>
            <Typography paragraph>
              We may release updates to improve functionality, fix bugs, or add new features, and updates may remove or change some existing features.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              15. Intellectual Property
            </Typography>
            <Typography paragraph>
              All content on the website, including text, designs, graphics, software, videos and audio, is owned by Dhallaty or its licensors and protected under intellectual property laws in Saudi Arabia and internationally.
            </Typography>
            <Typography paragraph>
              No part of the content may be copied, modified, reproduced or distributed without the prior written permission of Dhallaty. If you claim copyright infringement, please contact us with the information necessary to remove the infringing content.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              16. No Guarantees Provided
            </Typography>
            <Typography paragraph>
              The website and service are provided "as is" and "as available" without any express or implied warranties, including warranties of merchantability, for a particular purpose, or non-infringement.
            </Typography>
            <Typography paragraph>
              We do not guarantee that the service will be free of errors, interruptions or viruses, nor do we guarantee that any issues will be fixed.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              17. Waiver
            </Typography>
            <Typography paragraph>
              Failure to exercise any right or delay in exercising it shall not constitute a waiver thereof. Waiving a single breach is not a waiver of any subsequent breaches.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              18. Dispute Settlement
            </Typography>
            <Typography paragraph>
              This section applies to any dispute relating to the website or these Terms. A written "dispute notice" containing communication information, a description of the dispute, and the requested resolution must be sent to: admin@dhallaty.sa.
            </Typography>
            <Typography paragraph>
              The parties shall attempt to settle the dispute amicably within 60 days, and if this is not possible, the case will be submitted to the competent court in the Kingdom of Saudi Arabia.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              19. Promotions
            </Typography>
            <Typography paragraph>
              From time to time, Dhallaty may offer contests, raffles, or promotions subject to separate eligibility requirements. It is your responsibility to review them and confirm your eligibility before participating.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              20. Disclaimer
            </Typography>
            <Typography paragraph>
              Dhallaty is not responsible for any errors or inaccuracies in the content or code, and does not bear any direct, indirect or consequential damages resulting from the use of the service or its content.
            </Typography>
            <Typography paragraph>
              We have the right to modify or delete any content at any time without prior notice.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              21. General Provisions
            </Typography>
            <Typography paragraph>
              These terms constitute a legal agreement between you and Dhallaty. By using the website or completing any order, you agree to these Terms and Privacy Policy.
            </Typography>
            <Typography paragraph>
              If any clause is deemed invalid or unenforceable, it will be amended to the extent necessary, and the remaining clauses will remain in effect.
            </Typography>
            <Typography paragraph>
              We have the right to refuse or cancel any order entered with incorrect information or prices due to a typo, with an immediate refund to the original payment method.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              22. Providing Suggestions
            </Typography>
            <Typography paragraph>
              Any ideas, suggestions or comments you provide regarding the application or service remain the property of Dhallaty and may be used, modified or published without obligation to compensate.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              23. Contacting us
            </Typography>
            <Typography paragraph>
              If you have any questions, please contact us via our email: support@dhallaty.sa or via our website: <a href="https://dhallaty.sa" target="_blank" rel="noopener noreferrer">https://dhallaty.sa</a>.
            </Typography>
          </Fragment>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;
