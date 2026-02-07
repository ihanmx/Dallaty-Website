
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
        "يشير مصطلح «ضالتي» إلى المنصة الإلكترونية المملوكة والمُدارة من قبل شركة هيلا للتقنية الذكية للمعلومات، والتي تقدم خدمات الإبلاغ عن المفقودات والموجودات.",
        "ويُقصد بمصطلح «الخدمة» أي خدمات يتم تقديمها من خلال موقع ضالتي الإلكتروني أو تطبيقاته أو القنوات التابعة له.",
        "القوة القاهرة: أي حدث أو ظرف خارج عن نطاق السيطرة المعتادة ولا يمكن توقعه أو منعه في الظروف العادية.",
        "حقوق الملكية الفكرية: تشمل النصوص، والتصاميم، والرسومات، والمحتوى، والبرمجيات، والعلامات التجارية، والشعارات، وأي مواد أخرى مملوكة أو مرخّصة لصالح ضالتي."
      ]
    },
    {
      title: "2. نطاق الخدمة ووصفها",
      content: [
        "تمنحك ضالتي ترخيصًا محدودًا وغير حصري وغير قابل للنقل أو التنازل لاستخدام الخدمة والوصول إليها وفقًا لهذه الشروط والأحكام.",
        "وباستخدامك للخدمة، فإنك تقرّ بموافقتك الكاملة على هذه الشروط، وفي حال عدم قبولك لها، يجب عليك التوقف فورًا عن استخدام الخدمة.",
        "تنطبق هذه الشروط فقط على الخدمات المقدمة من قبل ضالتي، وقد يتضمن موقعنا روابط لخدمات أطراف ثالثة لا تقع ضمن مسؤوليتنا.",
        <Fragment key="site-link-ar">
          الموقع الرسمي: <a href="https://dhallaty.sa" target="_blank" rel="noopener noreferrer">https://dhallaty.sa</a>
        </Fragment>
      ]
    },
    {
      title: "2.1. آلية نموذج العمل",
      content: [
        "تتوفر خدمات ضالتي في جميع أنحاء المملكة العربية السعودية، في البيئات المفتوحة والمغلقة (مثل المراكز التجارية، الجامعات، وغيرها).",
        "تُمكّن المنصة أي شخص من الإبلاغ عن غرض مفقود أو موجود عبر نموذج إلكتروني يتم حفظ بياناته بشكل آمن في قاعدة البيانات.",
        "تستخدم المنصة تقنيات الذكاء الاصطناعي لمطابقة بلاغات المفقودات مع بلاغات الموجودات، ويتم إرسال تنبيه من فريق ضالتي إلى مالك الغرض المفقود عند وجود تطابق محتمل.",
        "بعد إتمام عملية التسليم بنجاح، يتم تغيير حالة البلاغ إلى «تم التسليم» وأرشفته تلقائيًا. كما يتم تحديث البيانات تلقائيًا لضمان الدقة، وأرشفة البلاغات التي مضى عليها أكثر من 90 يومًا."
      ]
    },
    {
      title: "2.2. إرشادات وخطوات الإبلاغ عن غرض موجود",
      content: [
        "تسليم الغرض إلى الجهة المسؤولة عن المفقودات في الموقع (مثل رجل الأمن أو مسؤول المفقودات – إن وُجد).",
        "تسجيل الدخول إلى موقع ضالتي واختيار «الإبلاغ عن غرض موجود» وتعبئة النموذج.",
        "إنشاء حساب (في حال عدم وجود حساب مسبق).",
        "الانضمام تلقائيًا إلى عضوية سفراء ضالتي والاستفادة من مزايا العضوية."
      ]
    },
    {
      title: "2.3. إرشادات وخطوات الإبلاغ عن غرض مفقود",
      content: [
        "تسجيل الدخول إلى موقع ضالتي واختيار «الإبلاغ عن غرض مفقود» وتعبئة النموذج.",
        "إنشاء حساب (في حال عدم وجود حساب مسبق).",
        "متابعة حالة البلاغ؛ وعند حدوث تطابق تلقائي، يظهر تنبيه للمستخدم دون إظهار البيانات الشخصية للطرف الآخر.",
        "تأكيد التطابق يدويًا ودفع الرسوم (إن وُجدت) لعرض تفاصيل موقع استلام الغرض.",
        "بعد الدفع، تظهر معلومات موقع الغرض وفقًا للتعليمات المحددة."
      ]
    },
    {
      title: "2.4. توضيحات تنظيمية مهمة",
      content: [
        "أ) ضالتي تقدم خدمة إلكترونية فقط، وليست جهة تخزين أو نقل، ولا تقوم بنقل أو حفظ الأغراض.",
        "ب) الأغراض الموجودة لا يتم تخزينها أو إدارتها ماديًا من قبل ضالتي بأي شكل من الأشكال.",
        "ج) تتم عمليات المطابقة والتنبيهات والأرشفة بشكل تلقائي و/أو يدوي من قبل فريق ضالتي لتحسين تجربة المستخدم وتجنب المشكلات المستقبلية.",
        "د) ضالتي ليست شريكًا أو مشغّلًا للأماكن التي يتم فيها الإبلاغ (سواء كانت عامة أو خاصة)، ولا تتحمل أي مسؤولية ضمن نطاق إدارة تلك الجهات."
      ]
    },
    {
      title: "3. مدة الاتفاق وإنهاؤه",
      content: [
        "تظل هذه الشروط سارية المفعول إلى أن يتم إنهاؤها من قبلك أو من قبل ضالتي. ويحق لضالتي تعليق أو إنهاء الوصول إلى الخدمة في أي وقت ودون إشعار مسبق في حال مخالفة الشروط.",
        "يمكنك إنهاء استخدام الخدمة عن طريق حذف الموقع أو التطبيق من جهازك والتوقف عن استخدامه."
      ]
    },
    {
      title: "4. الخدمات الخارجية (الطرف الثالث)",
      content: [
        "قد تتيح ضالتي الوصول إلى محتوى أو خدمات مقدمة من أطراف ثالثة. ويكون استخدامك لها على مسؤوليتك الخاصة ووفقًا لشروط مقدميها. ولا تتحمل ضالتي أي مسؤولية عن دقة أو قانونية أو جودة تلك الخدمات."
      ]
    },
    {
      title: "5. المسؤولية",
      content: [
        "لا تتحمل ضالتي في أي حال من الأحوال مسؤولية أي أضرار مباشرة أو غير مباشرة أو تبعية ناتجة عن استخدامك أو عدم قدرتك على استخدام الخدمة، بما في ذلك فقدان البيانات أو الأرباح.",
        "وفي حال ترتب على استخدامك للموقع الحاجة إلى صيانة أو إصلاح أي أجهزة أو بيانات، فإنك تتحمل كامل المسؤولية عن ذلك.",
        "وتحتفظ ضالتي بحقها في تعديل الأسعار أو سياسات الاستخدام في أي وقت دون إشعار مسبق.",
        "تعمل الخدمة داخل حدود المملكة العربية السعودية، وإذا قمت بالوصول إليها من خارج المملكة، فإنك تتحمل مسؤولية الالتزام بالقوانين المحلية المعمول بها."
      ]
    },
    {
      title: "6. تحديد المسؤولية",
      content: [
        "في حال تعرضك لأي ضرر نتيجة استخدام الموقع، فإن الحد الأقصى لمسؤولية ضالتي تجاهك يساوي المبلغ الذي قمت بدفعه مقابل استخدام الخدمة (إن وُجد).",
        "ولا تتحمل ضالتي أو مورّدوها أي مسؤولية عن فقدان الأرباح أو البيانات أو انقطاع الأعمال أو فقدان الخصوصية أو الإصابات الشخصية أو أي أضرار تبعية أخرى، حتى في حال التنبيه بإمكانية حدوثها."
      ]
    },
    {
      title: "7. الدفع",
      content: [
        "قد تتطلب بعض الخدمات اشتراكًا أو رسومًا. وبإدخالك لمعلومات الدفع، فإنك تفوض ضالتي بالتحقق من الرسوم المستحقة وخصمها.",
        "وتتحمل مسؤولية تحديث بيانات الفوترة الخاصة بك وإبلاغنا فورًا بأي تغيير."
      ]
    },
    {
      title: "8. سياسة الإرجاع والاسترداد",
      content: [
        "تخضع جميع الطلبات المقدمة عبر المنصة لهذه الشروط وسياسة الخصوصية. وبإتمام أي عملية، فإنك تؤكد موافقتك على السياسات المعمول بها.",
        "نسعى لمعالجة الشكاوى بسرعة وبما يحقق رضا معقولًا عبر خدمة العملاء.",
        "تنبيه مهم: لا يمكن استرداد المبلغ بعد تأكيد عملية المطابقة وإظهار موقع الاستلام، إلا في حالات استثنائية يتم تقديرها من قبل ضالتي."
      ]
    },
    {
      title: "9. تعليق الخدمة وتحديث الصفحة",
      content: [
        "يجوز لضالتي، وفقًا لتقديرها الخاص ودون إشعار مسبق، تعليق أو إيقاف تقديم الخدمة كليًا أو جزئيًا بشكل مؤقت أو دائم. وفي حال تعطيل حسابك، قد تفقد الوصول إلى البيانات المخزنة.",
        "وسيتم نشر أي تحديثات على هذه الصفحة مع تاريخ آخر تعديل."
      ]
    },
    {
      title: "10. التعديلات على الشروط والأحكام",
      content: [
        "يجوز لنا تعديل هذه الشروط في أي وقت. وإذا كانت التعديلات جوهرية، سنقوم بإشعارك قبل 15 يومًا على الأقل من سريانها. ويُعد استمرارك في استخدام الموقع بعد ذلك موافقة منك على الشروط المعدلة."
      ]
    },
    {
      title: "11. الشروط الكاملة",
      content: [
        "تشكل هذه الشروط، وسياسة الخصوصية، وأي إشعارات قانونية أخرى الاتفاق الكامل والنهائي بينك وبين ضالتي بشأن استخدام الموقع، وتلغي أي اتفاقيات سابقة."
      ]
    },
    {
      title: "12. تحديثات الشروط والأحكام",
      content: [
        "قد نقوم بتحديث خدماتنا أو سياساتنا من وقت لآخر، وسنقوم بإشعارك وفقًا للمتطلبات التنظيمية وإتاحة الفرصة لمراجعة الشروط المحدثة. وفي حال عدم موافقتك، يمكنك حذف حسابك."
      ]
    },
    {
      title: "13. التعديلات على الموقع",
      content: [
        "نحتفظ بحقنا في تعديل أو تعليق أو إيقاف أي جزء من الموقع أو خدماته في أي وقت دون إشعار أو مسؤولية."
      ]
    },
    {
      title: "14. تحديثات الموقع",
      content: [
        "قد نقوم بإصدار تحديثات لتحسين الأداء أو إصلاح الأخطاء أو إضافة ميزات جديدة، وقد تؤدي التحديثات إلى إزالة أو تغيير بعض الميزات الحالية."
      ]
    },
    {
      title: "15. الملكية الفكرية",
      content: [
        "جميع محتويات الموقع، بما في ذلك النصوص والتصاميم والرسومات والبرمجيات ومقاطع الفيديو والصوتيات، مملوكة لضالتي أو للمرخّصين لها، ومحميّة بموجب أنظمة الملكية الفكرية في المملكة العربية السعودية وعلى المستوى الدولي.",
        "ولا يجوز نسخ أو تعديل أو إعادة إنتاج أو توزيع أي جزء من المحتوى دون موافقة خطية مسبقة من ضالتي. وفي حال ادعاء انتهاك حقوق النشر، يرجى التواصل معنا لتقديم المعلومات اللازمة لإزالة المحتوى المخالف."
      ]
    },
    {
      title: "16. عدم تقديم أي ضمانات",
      content: [
        "يتم تقديم الموقع والخدمة «كما هي» و«حسب التوفر» دون أي ضمانات صريحة أو ضمنية، بما في ذلك ضمانات القابلية للتسويق أو الملاءمة لغرض معين أو عدم الانتهاك.",
        "ولا نضمن خلو الخدمة من الأخطاء أو الانقطاعات أو الفيروسات، ولا نضمن معالجة جميع المشكلات."
      ]
    },
    {
      title: "17. التنازل",
      content: [
        "إن عدم ممارسة أي حق أو التأخر في ممارسته لا يُعد تنازلًا عنه. ولا يُعد التنازل عن مخالفة واحدة تنازلًا عن أي مخالفات لاحقة."
      ]
    },
    {
      title: "18. تسوية النزاعات",
      content: [
        "ينطبق هذا البند على أي نزاع يتعلق بالموقع أو بهذه الشروط. ويجب إرسال إشعار نزاع خطي يتضمن بيانات التواصل ووصف النزاع والحل المطلوب إلى:",
        "admin@dhallaty.sa",
        "يسعى الطرفان إلى تسوية النزاع وديًا خلال 60 يومًا، وفي حال تعذر ذلك، يتم رفع الدعوى أمام المحكمة المختصة في المملكة العربية السعودية."
      ]
    },
    {
      title: "19. العروض الترويجية",
      content: [
        "قد تقدم ضالتي من وقت لآخر مسابقات أو سحوبات أو عروضًا ترويجية تخضع لشروط أهلية منفصلة، ويقع على عاتقك مسؤولية مراجعتها والتأكد من أهليتك قبل المشاركة."
      ]
    },
    {
      title: "20. إخلاء المسؤولية",
      content: [
        "لا تتحمل ضالتي أي مسؤولية عن الأخطاء أو عدم الدقة في المحتوى أو الكود، ولا تتحمل أي أضرار مباشرة أو غير مباشرة أو تبعية ناتجة عن استخدام الخدمة أو محتواها.",
        "ويحق لنا تعديل أو حذف أي محتوى في أي وقت دون إشعار مسبق."
      ]
    },
    {
      title: "21. أحكام عامة",
      content: [
        "تشكل هذه الشروط اتفاقًا قانونيًا ملزمًا بينك وبين ضالتي. وباستخدامك للموقع أو إتمام أي طلب، فإنك توافق على هذه الشروط وسياسة الخصوصية.",
        "وفي حال اعتبار أي بند غير صالح أو غير قابل للتنفيذ، يتم تعديله بالقدر اللازم، وتظل بقية البنود سارية المفعول.",
        "ويحق لنا رفض أو إلغاء أي طلب تم إدخاله بمعلومات أو أسعار غير صحيحة نتيجة خطأ مطبعي، مع إعادة المبلغ فورًا إلى وسيلة الدفع الأصلية."
      ]
    },
    {
      title: "22. تقديم المقترحات",
      content: [
        "تُعد أي أفكار أو اقتراحات أو ملاحظات تقدمها بشأن التطبيق أو الخدمة ملكًا لضالتي، ويجوز لنا استخدامها أو تعديلها أو نشرها دون أي التزام بتعويض."
      ]
    },
    {
      title: "23. التواصل معنا",
      content: [
        "لأي استفسارات، يمكنكم التواصل معنا عبر البريد الإلكتروني:",
        "support@dhallaty.sa",
        <Fragment key="site-link-contact-ar">
          أو من خلال موقعنا الإلكتروني: <a href="https://dhallaty.sa" target="_blank" rel="noopener noreferrer">https://dhallaty.sa</a>
        </Fragment>
      ]
    }
  ];

  const pageTitle = isArabic ? "الشروط والأحكام – ضالتي" : "Terms and Conditions - Dhallaty";
  const lastUpdate = isArabic ? "آخر تحديث: 8 سبتمبر 2025" : "Last update: 8th September 2025";

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
              If you have any questions, please contact us via our email: support@dhallaty.sa or via our website: https://dhallaty.sa.
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
