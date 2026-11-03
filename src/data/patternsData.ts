import { PatternData } from '../types/architecture';

export const PATTERNS_DATA: Record<string, PatternData> = {
  'model-gateway': {
    id: 'model-gateway',
    englishTitle: 'Model Gateway',
    persianTitle: 'درگاه مدیریت و تجرید مدل‌های زبانی',
    shortTagline: 'لایه میانجی متمرکز برای مسیریابی پویا، کشینگ معنایی، کنترل نرخ و تضمین تاب‌آوری در فراخوانی مدل‌های هوش مصنوعی',
    
    intro: {
      problem: 'در سامانه پاسخگویی دانشگاهی، اجزای مختلف (مانند موتور استدلال، خلاصه‌ساز مقررات، و چت‌بات دانشجویی) نیازمند ارتباط با مدل‌های زبانی مختلف (مانند مدل‌های تجاری با ظرفیت استدلال بالا و مدل‌های متن‌باز محلی جهت داده‌های محرمانه آموزشی) هستند. وابستگی مستقیم (Tightly Coupled) سیستم به یک تامین‌کننده مشخص (Vendor Lock-in)، عدم کنترل هزینه‌های API، نبود سازوکار کش متمرکز برای پرسش‌های پرتکرار دانشگاهی (نظیر تقویم آموزشی و حدنصاب مشروطی)، و فقدان مکانیسم تاب‌آوری (Circuit Breaker) هنگام قطعی سرویس، ثبات دانشگاه را تهدید می‌کند.',
      structure: {
        title: 'ساختار الگوی Model Gateway',
        description: 'الگوی درگاه مدل به عنوان ترکیبی از الگوهای کلاسیک Facade، Adapter، و Proxy در لایه معماری سیستم‌های هوشمند عمل می‌کند و یک نقطه ورودی یکپارچه (Unified API) را در برابر درخواست‌کنندگان قرار می‌دهد.',
        subComponents: [
          { name: 'مسیریاب پویا و سیاست‌گذار', englishName: 'Dynamic Semantic Router', responsibility: 'هدایت درخواست‌ها بر اساس حساسیت داده (محلی/ابری)، پیچیدگی تحلیل، و بودجه محاسباتی.' },
          { name: 'کش معنایی پرسش‌های دانشگاهی', englishName: 'Semantic Embedding Cache', responsibility: 'ذخیره‌سازی و بازیابی بلادرنگ پاسخ پرسش‌های پرتکرار با ارزیابی شباهت کسینوسی بیش از ۰.۹۲ جهت کاهش هزینه و تأخیر.' },
          { name: 'مدیر تاب‌آوری و کلید قطع مدار', englishName: 'Circuit Breaker & Fallback Manager', responsibility: 'پایش سلامت ارائه‌دهندگان، شناسایی قطعی و سوئیچ آنی به مدل‌های پشتیبان محلی (Local Fallback).' },
          { name: 'سامانه کنترل نرخ و اعتبارسنجی ترافیک', englishName: 'Token Bucket Rate Limiter', responsibility: 'جلوگیری از حملات انکار سرویس (DoS) و توزیع منصفانه سهمیه فراخوانی بر اساس نقش دانشجو/استاد.' },
          { name: 'مبدل پروتکل و آداپتورها', englishName: 'Provider Adapters (OpenAI/Anthropic/Local)', responsibility: 'استانداردسازی فرمت پرامپت‌ها و ساختار خروجی JSON میان ارائه‌دهندگان مختلف.' }
        ]
      },
      roleInSystem: 'این الگو نقش ستون فقرات ارتباطی سامانه دانشگاهی را ایفا می‌کند؛ به گونه‌ای که کل لایه‌های RAG و Planning بدون درگیری با جزییات پروتکل‌های خارجی، درخواست‌های خود را به صورت انتزاعی به Model Gateway ارسال می‌نمایند و از تضمین‌های امنیتی، محرمانگی اطلاعات دانشجویی، و دسترسی‌پذیری بالا (High Availability) بهره‌مند می‌شوند.',
      advantages: [
        'کاهش هزینه‌های عملیاتی تا ۶۰٪ به کمک کش معنایی سوالات پرتکرار نظیر مهلت حذف و اضافه یا سنوات تحصیلی',
        'جلوگیری قطعی از وابستگی به ارائه‌دهنده خاص (Vendor Lock-in) و امکان جایگزینی بدون وقفه در تولید',
        'تضمین حفظ حریم خصوصی داده‌های نمرات و پرونده‌های انضباطی با مسیریابی به مدل‌های درون‌سازمانی (On-Premise)',
        'تحمل خطای بالا (Fault Tolerance) به واسطه سوییچ خودکار روی مدل رزرو در کمتر از ۳۰۰ میلی‌ثانیه',
        'یکپارچگی نظارت، مانیتورینگ توکن‌های مصرفی و گزارش‌گیری متمرکز از بار دانشگاه'
      ],
      limitations: [
        'افزایش اندک در تاخیر اولیه درخواست‌های جدید به دلیل سربار پردازش میانجی (حدود ۱۵ الی ۳۰ میلی‌ثانیه)',
        'خطر تبدیل شدن به نقطه منفرد شکست (Single Point of Failure) در صورت عدم خوشه‌بندی توزیع‌شده',
        'پیچیدگی مدیریت ابطال کش (Cache Invalidation) به هنگام صدور بخشنامه‌ها و مصوبات جدید شورای آموزشی'
      ],
      useCasesInUniversity: [
        'پاسخگویی سریع به ده‌ها هزار استعلام همزمان دانشجویان در بازه انتخاب واحد بدون تحمیل هزینه گزاف به سرور دانشگاه',
        'حفظ پرونده‌های مشروطی و کمیسیون موارد خاص در سرور داخلی با مسیریابی خودکار به مدل محلی LLaMA/DeepSeek',
        'سوییچ خودکار روی سرور داخلی هنگام اختلال در اینترنت بین‌الملل یا اعمال تحریم‌های سرویس‌دهندگان ابری'
      ]
    },

    architecture: {
      overview: 'معماری Model Gateway در این سامانه از الگوی خط‌لوله فیلترهای تداخلی (Interception Filter Pattern) بهره می‌برد. هر درخواست ورودی از کلاینت دانشجویی یا موتور برنامه‌ریزی وارد زنجیره‌ای از فیلترهای احراز هویت، اعتبارسنجی امنیتی، کش معنایی، مسیریابی و کنترل ترافیک می‌شود.',
      components: [
        {
          id: 'mg-entry',
          name: 'درگاه ورودی و احراز هویت',
          englishName: 'Gateway Entrypoint & Auth Filter',
          type: 'security',
          description: 'بررسی توکن امنیتی دانشجو (JWT دانشگاهی)، نقش کاربری و نرخ مصرف مجاز دانشجو.',
          responsibilities: ['تایید اعتبار توکن CAS/SSO دانشگاه', 'رد درخواست‌های غیرمجاز و تزریق شناسه دانشجو به سیاق امن'],
          interfaces: ['POST /api/v1/chat/completions', 'gRPC ModelService.GenerateStream'],
          slaOrProtocol: 'HTTP/2 و gRPC | تاخیر زیر ۵ میلی‌ثانیه'
        },
        {
          id: 'mg-cache',
          name: 'موتور کش معنایی (وکتوری)',
          englishName: 'Semantic Vector Cache',
          type: 'storage',
          description: 'محاسبه امبدینگ سریع سوال با مدل سبک و جستجو در کش Redis/Qdrant برای سوالات مشابه قوانین آموزشی.',
          responsibilities: ['محاسبه شباهت کسینوسی', 'ارسال پاسخ بدون درگیری مدل زبانی در صورت تطابق بالای ۰.۹۲'],
          interfaces: ['Redis Vector Similarity Search (HNSW index)'],
          slaOrProtocol: 'زمان پاسخ کش زیر ۱۲ میلی‌ثانیه'
        },
        {
          id: 'mg-router',
          name: 'مسیریاب تطبیقی و سیاست‌گذار',
          englishName: 'Adaptive Policy Router',
          type: 'gateway',
          description: 'انتخاب بهترین مدل بر اساس محتوای پیام (آیا نیازمند استدلال عمیق است یا ترجمه/خلاصه‌سازی ساده؟ داده محرمانه است یا عمومی؟).',
          responsibilities: ['بررسی برچسب محرمانگی (Classification)', 'محاسبه بهینگی هزینه و سرعت بر اساس وضعیت کنونی سرورها'],
          interfaces: ['RoutingStrategy Interface'],
          slaOrProtocol: 'تصمیم‌گیری در زیر ۳ میلی‌ثانیه'
        },
        {
          id: 'mg-circuit',
          name: 'مدیر مدار شکن و تاب‌آوری',
          englishName: 'Circuit Breaker & Fallback',
          type: 'gateway',
          description: 'نظارت بر نرخ خطای ۵xx و تایم‌اوت ارائه‌دهندگان بیرونی و انتقال ترافیک به خوشه‌های محلی.',
          responsibilities: ['تغییر وضعیت بین Closed, Open, Half-Open', 'اجرای استراتژی نزول ملایم (Graceful Degradation)'],
          interfaces: ['Resilience4j / Envoy Circuit Breaker Event Stream'],
          slaOrProtocol: 'آستانه خطای ۵۰٪ در پنجره ۱۰ ثانیه‌ای'
        },
        {
          id: 'mg-adapter',
          name: 'آداپتورهای چند ارائه‌دهنده‌ای',
          englishName: 'Multi-Provider Adapters',
          type: 'llm',
          description: 'تبدیل انتزاع درونی پیام‌ها به پارامترهای اختصاصی OpenAI، Anthropic و vLLM محلی دانشگاه.',
          responsibilities: ['یکسان‌سازی استریم توکن‌ها (SSE)', 'محاسبه تعداد دقیق توکن‌های ورودی/خروجی'],
          interfaces: ['REST JSON API / Server-Sent Events'],
          slaOrProtocol: 'Stream Latency: First-chunk < 450ms'
        }
      ],
      relationships: [
        {
          source: 'درگاه ورودی',
          target: 'موتور کش معنایی',
          relationType: 'همگام (Synchronous Check)',
          protocol: 'Internal In-Memory Call',
          description: 'بررسی اینکه آیا پرسش دانشجو قبلاً با دقت بالا توسط دانشجویان دیگر پرسیده و تایید شده است یا خیر.'
        },
        {
          source: 'موتور کش معنایی',
          target: 'مسیریاب تطبیقی',
          relationType: 'در صورت Cache Miss',
          protocol: 'Internal Pipeline Dispatch',
          description: 'انتقال درخواست به مسیریاب برای گزینش بهینه‌ترین مدل زبانی.'
        },
        {
          source: 'مسیریاب تطبیقی',
          target: 'مدیر مدار شکن',
          relationType: 'پایش سلامت',
          protocol: 'Health Probe & State Query',
          description: 'اطمینان از فعال بودن سرویس هدف پیش از ارسال بار سنگین پرامپت.'
        },
        {
          source: 'مدیر مدار شکن',
          target: 'آداپتورهای چند ارائه‌دهنده‌ای',
          relationType: 'ارسال و استریم',
          protocol: 'HTTPS / SSE Stream',
          description: 'فراخوانی مدل، دریافت خروجی جریانی و اعتبارسنجی خروجی قبل از تحویل به کاربر.'
        }
      ],
      dataAndControlFlow: [
        {
          step: 1,
          from: 'دانشجو / ماژول RAG',
          to: 'Gateway Entrypoint',
          action: 'ارسال پرامپت تقویت‌شده حاوی آیین‌نامه و پرسش دانشجو',
          payloadType: 'StandardizedPromptPayload { query, context, studentTier }',
          description: 'ورود درخواست با هدرهای احراز هویت دانشگاهی به ورودی گیت‌وی.'
        },
        {
          step: 2,
          from: 'Gateway Entrypoint',
          to: 'Semantic Vector Cache',
          action: 'بررسی کشینگ با امبدینگ سریع و تطابق موضوعی مقررات',
          payloadType: 'VectorQuery { vector: float[384], threshold: 0.92 }',
          description: 'در صورتی که پرسش عینا پاسخ تاییدشده داشته باشد، پاسخ درجا برگشت داده می‌شود.'
        },
        {
          step: 3,
          from: 'Semantic Vector Cache',
          to: 'Adaptive Policy Router',
          action: 'بررسی سیاست امنیتی و تعیین مدل مقصد (ابری یا سرور داخلی دانشگاه)',
          payloadType: 'RoutingContext { isConfidential: boolean, maxTokens: 1500 }',
          description: 'اگر استعلام شامل وضعیت کارنامه محرمانه دانشجو باشد، به سرور داخلی دانشگاه ارسال می‌گردد.'
        },
        {
          step: 4,
          from: 'Adaptive Policy Router',
          to: 'Circuit Breaker',
          action: 'بررسی وضعیت سلامت کلاستر انتخاب شده',
          payloadType: 'ProviderHealthCheck { provider: "vLLM-Campus-Cluster" }',
          description: 'تایید در دسترس بودن و عدم سربار ظرفیت پردازنده‌های گرافیکی دانشگاه.'
        },
        {
          step: 5,
          from: 'Circuit Breaker',
          to: 'Model Adapter',
          action: 'تبدیل و استریم توکن‌های پاسخ مدل زبانی',
          payloadType: 'ChunkStream { token, finish_reason, usage }',
          description: 'دریافت پاسخ بلادرنگ و ذخیره همزمان در کش معنایی برای استفاده سایر دانشجویان.'
        }
      ]
    },

    scenario: {
      scenarioTitle: 'استعلام فوری حدنصاب معدل مشروطی و اخذ همزمان دروس پیش‌نیاز در شرایط بحرانی انتخاب واحد',
      studentPersona: 'دانشجوی سال سوم مهندسی کامپیوتر در حال گذراندن روز دوم حذف و اضافه',
      queryExample: 'من در ترم ۴ معدلم ۱۱.۴۰ شده و مشروط شدم. آیا مجازم در ترم ۵ درس سیستم‌های عامل (هم‌نیاز با آزمایشگاه) را بردارم و سقف واحد مجاز من چقدر است؟',
      queryContext: 'حجم مراجعات همزمان بیش از ۲۵۰۰ دانشجو در ثانیه؛ نیاز به پاسخ تضمین‌شده و عدم اشتباه در ارقام آیین‌نامه مصوب وزارت علوم.',
      expectedOutcome: 'پاسخ مستند بر اساس ماده ۱۶ آیین‌نامه (سقف ۱۴ واحد برای مشروطی، امکان اخذ هم‌نیاز با تایید استاد راهنما) با زمان پاسخ زیر ۴۰۰ میلی‌ثانیه بدون سقوط سرور دانشگاه.',
      steps: [
        {
          stepNumber: 1,
          phaseName: 'پالایش و کنترل نرخ ورودی',
          componentInvolved: 'Gateway Rate Limiter & Guardrail',
          actionSummary: 'اعتبارسنجی سهمیه دانشجو و ممانعت از ارسال اسپم در بازه شلوغی سامانه گلستان',
          inputPayload: '{ studentId: "40012345", queryLength: 142 chars, timestamp: 1711234000 }',
          outputPayload: '{ allowed: true, remainingQuota: 48, sanitizedQuery: "..." }',
          realRuntimeBehavior: 'اجرای الگوریتم Token Bucket در حافظه توزیع‌شده Redis با کلید شناسه دانشجو',
          simulatedBehavior: 'شبیه‌سازی بار ترافیکی ۱۰,۰۰۰ درخواست در دقیقه و رد ۵٪ درخواست‌های غیرعادی',
          aiSuggestedReasoning: 'بررسی نیت پیام دانشجو برای تشخیص استعلام آموزشی در برابر حملات فریب پرامپت (Jailbreak)',
          status: 'completed'
        },
        {
          stepNumber: 2,
          phaseName: 'بررسی کش معنایی مقررات',
          componentInvolved: 'Semantic Cache (Qdrant/Redis)',
          actionSummary: 'تطبیق بردار امبدینگ سوال با مخزن کش پاسخ‌های تاییدشده آیین‌نامه مصوب',
          inputPayload: '{ queryVector: [0.021, -0.114, 0.441, ...], minCosineSimilarity: 0.92 }',
          outputPayload: '{ cacheHit: false, highestSimilarity: 0.81 (تطابق ناکافی برای پاسخ مستقیم) }',
          realRuntimeBehavior: 'محاسبه بردار پرسش با مدل بومی MiniLM و مقایسه برداری در کمتر از ۹ میلی‌ثانیه',
          simulatedBehavior: 'شبیه‌سازی سناریوی Cache-Miss برای نشان دادن فرآیند کامل مسیریابی و ارزیابی مدل',
          aiSuggestedReasoning: 'تشخیص اینکه سوال ترکیبی از دو قانون است (سقف مشروطی + قاعده دروس هم‌نیاز) و نمی‌توان پاسخ تک‌بعدی داد',
          status: 'completed'
        },
        {
          stepNumber: 3,
          phaseName: 'مسیریابی داده و تفکیک محرمانگی',
          componentInvolved: 'Model Router & Policy Engine',
          actionSummary: 'تشخیص سطح حساسیت محتوا و گزینش بهینه‌ترین مدل محاسباتی',
          inputPayload: '{ requiresStudentRecords: false, reasoningComplexity: "MEDIUM_HIGH" }',
          outputPayload: '{ selectedTarget: "Campus-OnPrem-vLLM", backupTarget: "External-Cloud-LLM" }',
          realRuntimeBehavior: 'انتخاب کلاستر محلی دانشگاه مستقر در مرکز فناوری اطلاعات برای عدم خروج داده‌های دانشگاهی',
          simulatedBehavior: 'شبیه‌سازی نرخ تاخیر شبکه محلی در برابر هزینه دلاری مدل‌های خارجی',
          aiSuggestedReasoning: 'ارزیابی اینکه پردازش در سرور داخلی دانشگاه امنیت بیشتری دارد و شامل داده‌های کارنامه است',
          status: 'completed'
        },
        {
          stepNumber: 4,
          phaseName: 'بررسی مدارشکن و پایش سلامت',
          componentInvolved: 'Circuit Breaker Manager',
          actionSummary: 'اطمینان از دسترسی‌پذیری و باز نبودن مدار کلاستر هدف',
          inputPayload: '{ cluster: "Campus-OnPrem-vLLM", currentHealth: "CLOSED (Healthy)" }',
          outputPayload: '{ proceedWithPrimary: true, timeoutWindowMs: 3000 }',
          realRuntimeBehavior: 'ثبت متریک Prometheus برای پایش زمان اجرای درخواست و لود GPU',
          simulatedBehavior: 'شبیه‌سازی احتمال خطای سرور ابری و تست سوئیچ به کلاستر پشتیبان',
          aiSuggestedReasoning: 'تضمین اینکه در صورت اشغال بودن تمام GPUهای داخلی، بلافاصله مدل ابری جایگزین شود',
          status: 'completed'
        },
        {
          stepNumber: 5,
          phaseName: 'تولید پاسخ ساختاریافته و کش‌گذاری',
          componentInvolved: 'Model Adapter & Output Sanitizer',
          actionSummary: 'دریافت پاسخ، فیلتر عبارات غیرقانونی، اعتبارسنجی ارقام واحدهای درسی و ذخیره در کش',
          inputPayload: '{ rawCompletion: "بر اساس ماده ۱۶... سقف واحد شما ۱۴ واحد است..." }',
          outputPayload: '{ validatedAnswer: "طبق ماده ۱۶ آیین‌نامه...", verifiedArticles: ["ماده ۱۶", "تبصره ۲ ماده ۱۰"] }',
          realRuntimeBehavior: 'بررسی وجود ارجاع به ماده قانونی معتبر با رجکس و تایید ساختار JSON خروجی',
          simulatedBehavior: 'شبیه‌سازی استریم توکن‌ها در فرانت‌اند با سرعت ۵۰ کاراکتر بر ثانیه',
          aiSuggestedReasoning: 'تایید عدم تناقض میان سقف ۱۴ واحدی با قوانین اخذ هم‌نیاز در نیمسال‌های مشروطی',
          status: 'completed'
        }
      ]
    },

    designDecisionAnalysis: {
      contextAndDriver: 'در یک سامانه پاسخگویی دانشگاهی، ارتباط کلاینت‌ها با هوش مصنوعی چگونه باید ساختاربندی شود؟ آیا هر زیرسیستم (نظیر ربات تلگرام دانشجویی، سامانه گلستان و وب‌پرتال) باید مستقیماً با SDKهای گوناگون متصل شوند، یا یک لایه درگاه متمرکز (Model Gateway) مستقر گردد؟',
      solutionA: {
        name: 'معماری فراخوانی مستقیم و پراکنده (Direct Multi-SDK Integration)',
        architectureType: 'Point-to-Point / Decentralized Client Integration',
        description: 'هر سرویس یا ماژول دانشگاهی مستقیماً از کتابخانه‌های رسمی ارائه‌دهندگان (مانند OpenAI SDK یا LangChain مستقیم) برای ارتباط با مدل‌ها استفاده می‌کند.',
        strengths: [
          'پیاده‌سازی سریع اولیه بدون نیاز به تعریف زیرساخت سروری اختصاصی',
          'استفاده مستقیم از قابلیت‌های انحصاری هر ارائه‌دهنده بدون لایه تجرید'
        ],
        weaknesses: [
          'وابستگی شدید (Tight Coupling) و هزینه گزاف جایگزینی یا به‌روزرسانی مدل‌ها',
          'ناتوانی در کنترل هزینه‌ها و عدم امکان پیاده‌سازی کش معنایی یکپارچه',
          'پراکندگی کلیدهای امنیتی API در کدهای مختلف و ریسک بالای نشت امنیتی',
          'عدم وجود تاب‌آوری سازمانی هنگام قطعی اینترنت بین‌الملل یا مسدودسازی حساب'
        ],
        costLatencyFactor: 'هزینه عملیاتی حداکثری، بدون کش اشتراکی؛ آسیب‌پذیری بالا در نوسان تاخیر'
      },
      solutionB: {
        name: 'معماری درگاه متمرکز تجرید و مسیریابی (Unified Model Gateway Pattern)',
        architectureType: 'Centralized Gateway / Reverse Proxy with Facade & Circuit Breaker',
        description: 'ایجاد یک مایکروسرویس متمرکز با استاندارد مشترک که تمامی درخواست‌های هوش مصنوعی دانشگاه را فیلتر، ایمن، کش و مسیریابی می‌کند.',
        strengths: [
          'جداسازی کامل منطق تجاری دانشگاه از تغییرات و نوسانات شرکت‌های سازنده مدل',
          'کاهش هزینه‌ها و پهنای باند تا ۶۰٪ با فعال‌سازی کش وکتوری اشتراکی برای دانشجویان',
          'قابلیت سوییچ آنی به سرورهای محلی دانشگاه در شرایط اضطراری',
          'مدیریت متمرکز کلیدهای دسترسی، ممیزی امنیتی و رعایت مقررات حریم خصوصی'
        ],
        weaknesses: [
          'افزایش یک گره اضافه در معماری شبکه و نیاز به نگهداری سرور درگاه با High Availability',
          'نیاز به بازتعریف برخی ویژگی‌های خاص هر مدل در قالب پروتکل‌های عمومی'
        ],
        costLatencyFactor: 'کاهش ۶۰٪ هزینه‌ها با سربار ناچیز کمتر از ۲۰ میلی‌ثانیه برای فیلترها'
      },
      tradeOffAnalysis: [
        {
          dimension: 'قابلیت نگهداری و استقلال (Modifiability & Portability)',
          solutionAAssessment: 'ضعیف: تغییر مدل نیازمند اصلاح ده‌ها پروژه نرم‌افزاری دانشگاهی است.',
          solutionBAssessment: 'بسیار قوی: تغییر مدل تنها با تغییر یک کانفیگ در گیت‌وی اعمال می‌شود.',
          winner: 'B',
          justification: 'در محیط دانشگاهی که سیاست‌ها و تحریم‌ها مکرراً تغییر می‌کنند، قابلیت انتقال حیاتی است.'
        },
        {
          dimension: 'هزینه زیرساخت و مصرف توکن (Operating Cost Efficiency)',
          solutionAAssessment: 'بسیار پرهزینه: هر استعلام تکراری دوباره مستلزم پرداخت هزینه توکن است.',
          solutionBAssessment: 'بسیار بهینه: پرسش‌های متداول حذف و اضافه مستقیماً از حافظه کش خوانده می‌شوند.',
          winner: 'B',
          justification: 'بیش از ۷۰٪ سوالات دانشجویان در ایام امتحانات و ثبت‌نام همپوشانی معنایی دارند.'
        },
        {
          dimension: 'سادگی استقرار اولیه (Simplicity & Time to Market)',
          solutionAAssessment: 'سریع و بدون پیش‌نیاز زیرساختی در مقیاس کوچک آزمایشگاهی.',
          solutionBAssessment: 'نیازمند استقرار کانتینرهای درگاه، ردیس و رصد لاگ‌ها.',
          winner: 'A',
          justification: 'راهکار A فقط برای پروتوتایپ‌های چندساعته مناسب است، نه سیستم رسمی دانشگاه.'
        },
        {
          dimension: 'امنیت و کنترل حریم خصوصی (Data Privacy & Compliance)',
          solutionAAssessment: 'خطرناک: داده‌های کارنامه دانشجویان به آسانی به سرورهای ابری خارجی نشت می‌کند.',
          solutionBAssessment: 'امن و کنترل‌شده: گیت‌وی اطلاعات هویتی را ماسک کرده یا به سرور محلی هدایت می‌کند.',
          winner: 'B',
          justification: 'قوانین وزارت عتف حفاظت از داده‌های محرمانه آموزشی دانشجویان را الزامی کرده است.'
        }
      ],
      finalArchitecturalChoice: 'الگوی Unified Model Gateway به عنوان راهکار برتر انتخاب می‌شود.',
      doctoralRationale: 'بر اساس متدولوژی ارزیابی معماری ATAM و تحلیل سناریوهای پایداری دانشگاهی، هزینه اولیه استقرار درگاه با صرفه‌جویی چندصد میلیونی در هزینه توکن‌ها، حفاظت از سوابق تحصیلی و جلوگیری از قفل‌شدگی سیستمی به سرعت جبران شده و ویژگی‌های کیفی قابلیت اعتماد (Reliability) و امنیت (Security) را به سطح استاندارد دکتری ارتقا می‌دهد.'
    },

    evaluation: {
      overview: 'ارزیابی تاب‌آوری و ریسک‌های معماری Model Gateway با تمرکز بر بارگذاری ترافیکی فوق‌العاده دانشگاهی و الزامات حقوقی آموزش عالی:',
      risksAndMitigations: [
        {
          id: 'mg-risk-1',
          riskTitle: 'گلوگاه کارایی و نقطه منفرد شکست (Single Point of Failure - SPoF)',
          severity: 'بحرانی',
          architecturalVulnerability: 'اگر تمام کلاینت‌های دانشگاه وابسته به گیت‌وی باشند، سقوط این لایه کل سامانه پاسخگویی را مختل می‌سازد.',
          concreteConsequence: 'در ایام ثبت‌نام و انتخاب واحد، با قطع شدن درگاه، هزاران دانشجو از دریافت پاسخ سوالات اضطراری محروم می‌شوند.',
          remedialStrategy: 'استقرار درگاه در قالب کلاسترهای توزیع‌شده چندگانه (Active-Active Replica) پشت سرور Load Balancer با NGINX/Envoy و سازوکار Keep-Alive.',
          architecturalRevision: 'افزودن لایه توزیع بار کلاستر L4/L7 و تعریف مکانیزم DNS Failover با دو آی‌پی مجزا در سرورهای دانشگاهی.',
          isoImpact: 'ارتقای قابلیت دسترسی‌پذیری (Availability) از ۹۸.۱٪ به ۹۹.۹۵٪ بر مبنای ISO 25010.'
        },
        {
          id: 'mg-risk-2',
          riskTitle: 'مسمومیت کش با قوانین منسوخ (Cache Poisoning & Stale Regulations)',
          severity: 'بالا',
          architecturalVulnerability: 'در صورت تصویب آیین‌نامه جدید آموزشی، پاسخ‌های ذخیره شده در کش معنایی همچنان قوانین قدیمی را بازمی‌گردانند.',
          concreteConsequence: 'دانشجو بر اساس پاسخ کش شده اقدام به حذف درس می‌کند، در حالی که در آیین‌نامه سال جدید این قانون لغو شده است؛ ایجاد تبعات حقوقی برای دانشگاه.',
          remedialStrategy: 'پیاده‌سازی مکانیزم ابطال کش رویدادمحور (Event-Driven Cache Eviction) متصل به سامانه دبیرخانه مصوبات دانشگاه با کلیدگذاری معنایی مبتنی بر نسخه سند (Versioned Tagging).',
          architecturalRevision: 'افزودن فیلد `regulation_epoch_hash` به بردار کلیدهای کش در ردیس؛ هر مصوبه جدید سبب باطل شدن خودکار کلیدهای موضوع مرتبط می‌شود.',
          isoImpact: 'تضمین صحت عملکردی (Functional Correctness) و یکپارچگی داده‌ها (Data Integrity).'
        },
        {
          id: 'mg-risk-3',
          riskTitle: 'سرریز حافظه و نشت توکن در درخواست‌های استریمینگ طولانی',
          severity: 'متوسط',
          architecturalVulnerability: 'اتصالات باز SSE (Server-Sent Events) در هنگام مکالمات سنگین و طولانی ممکن است منابع سوکت سرور را اشغال کنند.',
          concreteConsequence: 'کاهش ظرفیت پذیرش اتصالات جدید دانشکده‌ها و ایجاد تاخیر تدریجی در سیستم.',
          remedialStrategy: 'تعیین حد آستانه سخت‌گیرانه زمان حیات اتصال (Connection TTL)، مدیریت حافظه با بافرهای جریانی و استفاده از مکانیزم Backpressure.',
          architecturalRevision: 'کانفیگ تایم‌اوت‌های تهاجمی (Aggressive Idle Timeout: 45s) و رهاسازی خودکار منابع پس از توکن پایانی [DONE].',
          isoImpact: 'بهبود بهره‌وری منابع پردازشی (Resource Utilization) و پایداری زمانی.'
        }
      ],
      resilienceScorecard: [
        { metric: 'میانگین زمان پاسخگویی (P95 Latency)', beforeMitigation: '۱,۴۵۰ میلی‌ثانیه', afterMitigation: '۲۸۰ میلی‌ثانیه (به دلیل کش معنایی بهینه)' },
        { metric: 'تحمل قطعی تامین‌کننده اصلی ابری', beforeMitigation: 'قطع کامل سامانه با خطای ۵۰۴', afterMitigation: 'سوئیچ خودکار در ۲۴۰ میلی‌ثانیه به سرور محلی' },
        { metric: 'حفاظت از اطلاعات محرمانه دانشجویان', beforeMitigation: 'ریسک نشت در درخواست‌های مستقیم', afterMitigation: 'پالایش و ماسک ۱۰۰٪ داده‌های هویتی پیش از ارسال' }
      ]
    },

    phase4: {
      rationale: {
        problemTackled: 'عدم قطعیت، پراکندگی، هزینه بالا و تحریم‌پذیری ارائه‌دهندگان مدل‌های هوش مصنوعی در زیرساخت فناوری اطلاعات دانشگاه.',
        architecturalNecessity: 'جداسازی دغدغه‌های غیرکارکردی (امنیت، پایش، کش، کنترل هزینه و تاب‌آوری) از هسته تجاری پاسخگویی به آیین‌نامه‌ها.',
        coreMechanism: 'ترکیب الگوهای Facade و Strategy جهت ایجاد یک رابط برنامه‌نویسی استاندارد که رفتارهای پیچیده مسیریابی را در پشت خود پنهان می‌سازد.'
      },
      interaction: {
        partnerPattern: 'RAG (Retrieval-Augmented Generation)',
        interactionName: 'تزریق بهینه اسناد و فشرده‌سازی پرامپت',
        interfaceContract: '`ModelGateway.executeWithContext(sanitizedQuery, retrievedChunks, tokenBudget)`',
        synergyBenefit: 'ماژول RAG اسناد استخراج شده از آیین‌نامه‌ها را به گیت‌وی تحویل می‌دهد؛ گیت‌وی با توجه به سقف پنجره کانتکست هر مدل، بخش‌های زاید را هرس کرده و خروجی را استریم می‌کند.',
        dependencyRisk: 'اگر گیت‌وی به اشتباه بخش‌های استنادی RAG را به دلیل محدودیت توکن حذف کند، پاسخ هوش مصنوعی دچار توهم و ابطال حقوقی می‌شود.',
        sequenceDescription: '۱. کلاینت دانشجو سوال را مطرح می‌کند -> ۲. RAG اسناد مرتبط را واکشی می‌کند -> ۳. پرامپت غنی شده به Model Gateway ارسال می‌شود -> ۴. گیت‌وی کش معنایی را بررسی می‌کند -> ۵. در صورت نبود، مدل بهینه را انتخاب و پاسخ را بازمی‌گرداند.'
      },
      failureMode: {
        anomalyTitle: 'قطعی سراسری ارائه‌دهنده خارجی هوش مصنوعی یا اعمال تحریم ناگهانی IPهای دانشگاهی',
        triggerEvent: 'بروز خطاهای متوالی HTTP 403 Forbidden یا 503 Service Unavailable در بیش از ۵ درخواست پیاپی ظرف ۶ ثانیه.',
        detectionMechanism: 'مانیتورینگ مدار شکن (Circuit Breaker) با آستانه ۵۰٪ خرابی در پنجره لغزان.',
        fallbackOrCircuitBreakerAction: 'تغییر وضعیت مدار شکن به وضعیت OPEN و انتقال خودکار ۱۰۰٪ ترافیک به خوشه‌های پردازش موازی داخلی vLLM با مدل‌های بومی Persian-LLaMA.',
        safetyGuarantee: 'هیچ دانشجویی با صفحه خطای سرور مواجه نمی‌شود؛ سیستم با یک بنر ملایم اطلاع می‌دهد که در وضعیت آفلاین دانشگاهی پاسخ می‌دهد.',
        recoveryStep: 'پس از برقراری مجدد ارتباط خارجی، مدار به وضعیت HALF-OPEN رفته و با تست ۲٪ درخواست‌ها، پایداری را تایید و سپس مدار CLOSED می‌شود.'
      },
      qualityAttributes: [
        {
          attributeName: 'قابلیت اطمینان و دسترسی‌پذیری (Reliability & Availability)',
          standardReference: 'ISO/IEC 25010 - بخش Reliability (Fault Tolerance & Availability)',
          definition: 'توانایی سامانه در حفظ سطح عملکرد مشخص در شرایط بروز خرابی‌های سخت‌افزاری، شبکه‌ای یا تحریم سرویس‌های خارجی.',
          architecturalTactic: 'به‌کارگیری الگوهای Active-Passive Redundancy، Fallback به مدل محلی، و Circuit Breaker.',
          metricAndThreshold: 'در دسترس بودن سامانه حداقل ۹۹.۹٪ (کمتر از ۴۳ دقیقه توقف در ماه) و زمان بازگشت از خطا کمتر از ۳۰۰ میلی‌ثانیه.',
          rationaleForAcademicQA: 'پاسخگویی به دانشجویان به ویژه در شب‌های پایانی انتخاب واحد نباید با افت سیستم یا قطعی سرور قطع شود.'
        },
        {
          attributeName: 'کارایی زمانی و تاخیر پاسخ (Time Behaviour / Latency)',
          standardReference: 'ISO/IEC 25010 - بخش Performance Efficiency (Time Behaviour)',
          definition: 'زمان پاسخگویی و توان پردازش سامانه در اجرای توابع خود تحت شرایط کاری معین.',
          architecturalTactic: 'استفاده از Semantic Caching بر مبنای تشابه برداری در سطح میلی‌ثانیه برای پاسخ‌های متداول.',
          metricAndThreshold: 'زمان تا اولین توکن جریانی (TTFT) کمتر از ۵۰۰ میلی‌ثانیه؛ زمان پاسخ درخواست‌های کش شده کمتر از ۵۰ میلی‌ثانیه.',
          rationaleForAcademicQA: 'تحمل دانشجویان در صف‌های آنلاین اندک است و تاخیر بالا موجب ارسال مجدد درخواست و تشدید بار سرور می‌شود.'
        }
      ],
      behaviorDistinction: [
        {
          aspect: 'منطق مسیریابی و کنترل ترافیک',
          realBehavior: 'اجرای کد واقعی بررسی هدرهای JWT، مسدودسازی IPهای متخلف، و تخصیص سهمیه توکن به کمک الگوریتم‌های قطعی ریاضی.',
          simulatedBehavior: 'شبیه‌سازی سناریوی ورود ۱۰ هزار دانشجوی همزمان در ساعت ۸ صبح روز ثبت‌نام و توزیع بار روی دو سرور.',
          aiSuggestedReasoning: 'تحلیل معنایی نیت کاربر توسط مدل سبک زبانی جهت تشخیص اینکه آیا سوال اضطراری است یا عمومی.'
        },
        {
          aspect: 'مدیریت خطا و سوئیچ اضطراری',
          realBehavior: 'بسته شدن سوکت TCP و بازگشت پیام استاندارد به لایه فراخوان هنگام دریافت خطای سوکت یا تایم‌اوت مشخص.',
          simulatedBehavior: 'تزریق تعمدی خطای قطعی اینترنت بین‌الملل جهت آزمودن استراتژی Failover و سنجش میزان افت کیفیت پاسخ‌ها.',
          aiSuggestedReasoning: 'تولید پیام دلجویانه و ساختاریافته به دانشجو مبنی بر ارجاع پرونده به آموزش کل به دلیل عدم قطعیت در مدل محلی.'
        }
      ],
      academicReferences: [
        {
          citation: 'Fowler, M. (2002). Patterns of Enterprise Application Architecture. Addison-Wesley Professional. (Gateway and Facade Patterns).',
          publicationType: 'کتاب مرجع',
          relevanceToPattern: 'مبانی نظری طراحی لایه‌های درگاه برای جداسازی سیستم‌های بیرونی از منطق تجاری داخلی.'
        },
        {
          citation: 'Nygard, M. T. (2018). Release It!: Design and Deploy Production-Ready Software. Pragmatic Bookshelf. (Circuit Breaker & Bulkhead Patterns).',
          publicationType: 'کتاب مرجع',
          relevanceToPattern: 'معماری تاب‌آوری در برابر خرابی آبشاری سرویس‌های شخص ثالث.'
        },
        {
          citation: 'Bass, L., Clements, P., & Kazman, R. (2021). Software Architecture in Practice (4th ed.). Addison-Wesley. (Availability and Modifiability Tactics).',
          publicationType: 'کتاب مرجع',
          relevanceToPattern: 'تاکتیک‌های مهندسی نرم‌افزار برای نیل به کیفیت‌های ISO 25010.'
        }
      ]
    }
  },

  'rag': {
    id: 'rag',
    englishTitle: 'RAG',
    persianTitle: 'تولید افزوده با بازیابی دانش (Retrieval-Augmented Generation)',
    shortTagline: 'تلفیق بازیابی ترکیبی اسناد رسمی دانشگاهی (برداری و کلیدواژه‌ای) با تولید مبتنی بر استناد دقیق به آیین‌نامه‌ها جهت حذف کامل توهم',
    
    intro: {
      problem: 'مدل‌های زبانی بزرگ (LLMها) مستعد پدیده‌ای موسوم به توهم (Hallucination) هستند و از جزئیات بخشنامه‌های جدید، مصوبات شورای دانشگاه و تبصره‌های دوره‌های تحصیلی مختلف بی‌اطلاعند. در حوزه اداری و حقوقی دانشگاه، پاسخ اشتباه درباره مواردی چون «شرایط اخراج تحصیلی»، «تطبیق واحد» یا «فرصت دفاع پایان‌نامه» می‌تواند عواقب حقوقی سنگین و تضییع حق دانشجو را به دنبال داشته باشد. بازآموزی (Fine-Tuning) مدل‌ها برای هر بخشنامه جدید بسیار پرهزینه، کند و بدون شفافیت استنادی است.',
      structure: {
        title: 'ساختار الگوی RAG هیبریدی دانشگاهی',
        description: 'الگوی RAG با اتصال مدل زبانی به یک پایگاه داده برداری و واژگانی غنی از متون معتبر، پیش از تولید پاسخ ابتدا اسناد قانونی معتبر و منطبق با سال ورود دانشجو را بازیابی کرده و سپس مدل را وادار به استناد کلمه‌به‌کلمه می‌کند.',
        subComponents: [
          { name: 'خط‌لوله هضم و تقطیع هوشمند اسناد', englishName: 'Legal Document Chunking & Ingestion Pipeline', responsibility: 'تقطیع هوشمند متون آیین‌نامه بر اساس ساختار درختی فصول، مواد و تبصره‌ها، نه صرفا شمارش کاراکترها.' },
          { name: 'بازیاب ترکیبی (هیبریدی)', englishName: 'Hybrid Retriever (Dense Vector + BM25 Lexical)', responsibility: 'ترکیب جستجوی معنایی با امبدینگ چندزبانه و جستجوی دقیق واژگانی برای شماره مواد قانونی (مانند ماده ۱۲ تبصره ۳).' },
          { name: 'بازرتبه‌بندی مبتنی بر انکودر متقاطع', englishName: 'Cross-Encoder Reranker', responsibility: 'ارزیابی دقیق‌تر ۲۰ قطعه برتر بازیابی شده و گلچین کردن ۳ الی ۵ قطعه کاملا مرتبط با پرسش دانشجو.' },
          { name: 'اعتبارسنج استناد و حقیقت‌سنجی', englishName: 'Citation & Hallucination Guardrail', responsibility: 'تطبیق ادعاهای موجود در پاسخ نهایی با متن سند استخراج‌شده پیش از نمایش به دانشجو.' }
        ]
      },
      roleInSystem: 'الگوی RAG ضامن صحت علمی و حقوقی سامانه است. این الگو تضمین می‌کند که هیچ پاسخی بدون درج مستقیم شماره ماده آیین‌نامه، تاریخ مصوبه وزارت علوم یا شورای دانشگاه و لینک معتبر به فایل PDF منبع به دانشجو تحویل داده نشود.',
      advantages: [
        'ریشه‌کنی توهم اطلاعاتی (Near-Zero Hallucination) با محدود کردن دامنه پاسخ به اسناد رسمی ضمیمه شده',
        'قابلیت استناد شفاف (Auditable Explanations) و امکان راستی‌آزمایی هر جمله توسط دانشجو و آموزش دانشگاه',
        'به‌روزرسانی آنی داده‌ها: افزودن یک بخشنامه جدید با بارگذاری چندثانیه‌ای PDF بدون نیاز به بازآموزی مدل',
        'تفکیک قوانین بر اساس دوره ورود دانشجو (مثلاً ورودی‌های ۱۴۰۰ به بعد در برابر ورودی‌های قدیم)'
      ],
      limitations: [
        'وابستگی مطلق کیفیت پاسخ به کارایی موتور بازیابی (پدیده Garbage In, Garbage Out)',
        'پیچیدگی تقطیع ساختاری متون حقوقی با جداول و فلوچارت‌های اداری پیچیده',
        'افزایش زمان پردازش و پنجره پرامپت به واسطه الحاق پاراگراف‌های طولانی آیین‌نامه‌ها'
      ],
      useCasesInUniversity: [
        'پاسخگویی به شرایط انتقال، مهمانی و تغییر رشته بین دانشگاه‌های دولتی با استناد به بخشنامه مصوب ۱۴۰۲',
        'استعلام نمره قبولی در آزمون جامع دکتری و تعداد مقالات ISI لازم برای مجوز دفاع نهایی',
        'ارائه ضوابط اسکان خوابگاه و اولویت‌بندی وام‌های صندوق رفاه دانشجویان با جداول مبالغ به‌روز'
      ]
    },

    architecture: {
      overview: 'معماری RAG در این سامانه یک خط‌لوله بازیابی دومرحله‌ای پیشرفته (Advance Two-Stage Retrieval with Cross-Encoder Reranking) است که به طور اختصاصی برای آیین‌نامه‌های سلسله‌مراتبی آموزش عالی بهینه‌سازی شده است.',
      components: [
        {
          id: 'rag-ingest',
          name: 'ماژول تقطیع مبتنی بر گرامر حقوقی',
          englishName: 'Hierarchical Document Parser',
          type: 'pipeline',
          description: 'تجزیه متون PDF آیین‌نامه‌ها به موجودیت‌های معنایی: فصل -> ماده -> بند -> تبصره.',
          responsibilities: ['حفظ سلسله مراتب حقوقی در متادیتا', 'استخراج و ذخیره شماره ماده و سال تصویب به عنوان فیلتر قطعی'],
          interfaces: ['PyMuPDF / Unstructured / Semantic Markdown'],
          slaOrProtocol: 'پردازش هر آیین‌نامه ۴۰ صفحه‌ای در زیر ۴ ثانیه'
        },
        {
          id: 'rag-vector-db',
          name: 'پایگاه برداری و شاخص متنی ترکیبی',
          englishName: 'Hybrid Vector & BM25 Store',
          type: 'storage',
          description: 'مخزن ذخیره‌سازی همزمان بردارهای چندبعدی و ایندکس لغوی برای جستجوی دقیق شماره مواد.',
          responsibilities: ['جستجوی HNSW برای بردارها', 'جستجوی معکوس BM25 برای کلیدواژه‌های اختصاصی نظیر "تبصره الف ماده ۲۴"'],
          interfaces: ['Qdrant Vector Database + Elasticsearch / BM25 Index'],
          slaOrProtocol: 'بازیابی ۲۰ قطعه اول در کمتر از ۳۵ میلی‌ثانیه'
        },
        {
          id: 'rag-rerank',
          name: 'موتور بازرتبه‌بندی (Reranker)',
          englishName: 'Cross-Encoder Re-Ranking Engine',
          type: 'agent',
          description: 'بررسی مجدد ارتباط قطعات با استفاده از مدل Cross-Encoder به جای شباهت ساده کسینوسی.',
          responsibilities: ['حذف قطعات گمراه‌کننده که تشابه لغوی دارند ولی پاسخ سوال نیستند', 'ارسال فقط ۳ سند فوق‌العاده مرتبط به پرامپت نهایی'],
          interfaces: ['bge-reranker-large Model Server'],
          slaOrProtocol: 'زمان استنتاج رنکر: ۶۰ الی ۸۰ میلی‌ثانیه'
        },
        {
          id: 'rag-synth',
          name: 'سنتزکننده پاسخ و استنادگر',
          englishName: 'Constrained Generator & Grounding Evaluator',
          type: 'llm',
          description: 'تزریق قطعات در قالب پرامپت سخت‌گیرانه (Strict Grounding Prompt) و ملزم کردن مدل به استناد مستقیم.',
          responsibilities: ['تولید پاسخ فارسی روان', 'افزودن برچسب استناد [سند ۱، ماده ۳] در پایان هر بند'],
          interfaces: ['Model Gateway Client API'],
          slaOrProtocol: 'تولید پاسخ در بازه ۱.۲ الی ۲ ثانیه'
        }
      ],
      relationships: [
        {
          source: 'Hierarchical Document Parser',
          target: 'Hybrid Vector & BM25 Store',
          relationType: 'ذخیره آفلاین و دوره‌ای',
          protocol: 'Batch Ingestion API',
          description: 'تبدیل آیین‌نامه‌های مصوب دانشگاه به بردارهای معنایی و کلمات کلیدی ایندکس شده.'
        },
        {
          source: 'پرسش دانشجو',
          target: 'Hybrid Vector & BM25 Store',
          relationType: 'جستجوی موازی',
          protocol: 'Reciprocal Rank Fusion (RRF)',
          description: 'اجرای همزمان جستجوی شباهت مفهومی و جستجوی کلمات کلیدی و ادغام نمرات با الگوریتم RRF.'
        },
        {
          source: 'Hybrid Vector & BM25 Store',
          target: 'Cross-Encoder Re-Ranking Engine',
          relationType: 'پالایش کاندیداها',
          protocol: 'Internal Array Transfer',
          description: 'ارسال ۲۰ قطعه اولیه جهت غربالگری و انتخاب ۴ قطعه با بالاترین رتبه کیفی.'
        },
        {
          source: 'Cross-Encoder Re-Ranking Engine',
          target: 'Constrained Generator',
          relationType: 'غنی‌سازی پرامپت (Context Augmentation)',
          protocol: 'Prompt Injection Context',
          description: 'تزریق قطعات تایید شده به متن پرامپت جهت تولید پاسخ نهایی توسط مدل زبانی.'
        }
      ],
      dataAndControlFlow: [
        {
          step: 1,
          from: 'دانشجو',
          to: 'Query Preprocessor',
          action: 'دریافت پرسش و تشخیص سال ورود و مقطع دانشجو از توکن احراز هویت',
          payloadType: 'StudentContext { matriculationYear: 1401, degree: "کارشناسی ارشد" }',
          description: 'استخراج متادیتا جهت فیلتر کردن آیین‌نامه‌های نامرتبط با مقطع و سال ورود دانشجو.'
        },
        {
          step: 2,
          from: 'Query Preprocessor',
          to: 'Hybrid Vector & BM25 Store',
          action: 'اجرای جستجوی فیلترشده بر اساس متادیتا (Metadata Pre-Filtering)',
          payloadType: 'FilteredQuery { query: "...", filter: { degree: "MSc", validFrom: { $lte: 1401 } } }',
          description: 'جلوگیری قطعی از واکشی قوانین منسوخ یا نامربوط به مقطع کارشناسی برای دانشجوی ارشد.'
        },
        {
          step: 3,
          from: 'Hybrid Vector & BM25 Store',
          to: 'Cross-Encoder Reranker',
          action: 'ارسال ۲۰ کاندیدای برتر برای تحلیل دقیق ارتباط زوج پرسش-سند',
          payloadType: 'CandidateArray [ { id, text, bm25Score, vectorScore } ]',
          description: 'مدل رنکر شباهت معنایی واقعی را ارزیابی کرده و نمرات دقیق صادر می‌کند.'
        },
        {
          step: 4,
          from: 'Cross-Encoder Reranker',
          to: 'Prompt Assembler',
          action: 'انتخاب ۳ قطعه با نمره بالاتر از ۰.۸۵ و چیدمان پرامپت با دستورات الزام به استناد',
          payloadType: 'AugmentedPromptWithCitations { systemRule, contextChunks, userQuery }',
          description: 'مدل ملزم می‌گردد اگر در اسناد ارسالی پاسخ موجود نبود، صراحتا اعلام کند اطلاعاتی نیافت.'
        },
        {
          step: 5,
          from: 'LLM Generator',
          to: 'Hallucination & Citation Checker',
          action: 'تطبیق ادعاهای تولید شده با اسناد خام و درج پیوندهای سند',
          payloadType: 'VerifiedResponse { textWithCitations, verifiedSources: [...] }',
          description: 'اطمینان از اینکه شماره ماده ذکر شده در پاسخ حقیقتا در سند وجود دارد و ساختگی نیست.'
        }
      ]
    },

    scenario: {
      scenarioTitle: 'درخواست مرخصی تحصیلی بدون احتساب در سنوات به دلیل جراحی پزشکی در نیمسال دوم',
      studentPersona: 'دانشجوی مقطع دکتری تخصصی کامپیوتر که درگیر درمان پزشکی است',
      queryExample: 'من دانشجوی دکتری ترم ۴ هستم و باید عمل جراحی انجام دهم. آیا می‌توانم بدون احتساب در سنوات مرخصی بگیرم؟ چه مدارکی لازم است و آخرین مهلت اقدام کی هست؟',
      queryContext: 'قوانین مرخصی بدون احتساب در دکتری با کارشناسی تفاوت اساسی دارد و نیازمند تایید کمیسیون پزشکی دانشگاه است.',
      expectedOutcome: 'پاسخ دقیق مستند به آیین‌نامه دکتری تخصصی دانشگاه مصوب ۱۳۹۷ (ماده ۲۲ و تبصره ۱) با تفکیک وظایف کمیسیون پزشکی و حداکثر سقف مجاز (۲ نیمسال).',
      steps: [
        {
          stepNumber: 1,
          phaseName: 'فیلتر متادیتا بر اساس مقطع',
          componentInvolved: 'Metadata Pre-Filtering',
          actionSummary: 'اعمال فیلتر قطعی روی پایگاه اسناد جهت حذف آیین‌نامه‌های کارشناسی و کاردانی',
          inputPayload: '{ degreeTarget: "دکتری تخصصی (PhD)", topic: "مرخصی تحصیلی - سنوات" }',
          outputPayload: '{ targetCorpus: "Bylaws_PhD_Regulations_v1397.pdf", totalCandidateChunks: 124 }',
          realRuntimeBehavior: 'اعمال فیلتر SQL-like در ایندکس برداری Qdrant با برچسب degree="PhD"',
          simulatedBehavior: 'شبیه‌سازی سناریوی مقایسه با زمانی که فیلتر اعمال نشده و اسناد کارشناسی به اشتباه بازیابی می‌شدند',
          aiSuggestedReasoning: 'جلوگیری از پاسخ با قوانین کارشناسی که مرخصی بدون احتساب را به گونه‌ای دیگر تعریف کرده‌اند',
          status: 'completed'
        },
        {
          stepNumber: 2,
          phaseName: 'بازیابی ترکیبی برداری و واژگانی',
          componentInvolved: 'Hybrid Retriever (BM25 + Dense Embeddings)',
          actionSummary: 'جستجوی همزمان معنای عمل جراحی/بیماری و تطابق واژگانی اصطلاحات "بدون احتساب در سنوات"',
          inputPayload: '{ denseQuery: "جراحی پزشکی مرخصی بیماری", sparseKeywords: ["مرخصی", "بدون احتساب", "سنوات", "کمیسیون پزشکی"] }',
          outputPayload: '{ topRetrievedChunks: 15 chunks, bestDenseScore: 0.88, bestBm25Score: 14.2 }',
          realRuntimeBehavior: 'ادغام لیست‌های رتبه‌بندی شده با فرمول استاندارد RRF با پارامتر k=60',
          simulatedBehavior: 'شبیه‌سازی وزن‌دهی ۶۰٪ به تشابه برداری و ۴۰٪ به تطابق کلیدواژه‌ای',
          aiSuggestedReasoning: 'بررسی اینکه واژه "سنوات" در متون حقوقی کلیدواژه بسیار حساسی است و باید حتما تطابق لغوی داشته باشد',
          status: 'completed'
        },
        {
          stepNumber: 3,
          phaseName: 'بازرتبه‌بندی با انکودر متقاطع',
          componentInvolved: 'Cross-Encoder Reranker',
          actionSummary: 'محاسبه امتیاز همبستگی عمیق برای هر جفت (پرسش دانشجو، قطعه آیین‌نامه)',
          inputPayload: '{ pairs: 15 items, model: "bge-reranker-large" }',
          outputPayload: '{ topChunk1: "ماده ۲۲: مرخصی بدون احتساب با تایید کمیسیون پزشکی (امتیاز ۰.۹۴)", topChunk2: "تبصره ۱: سقف ۲ نیمسال در طول دوره دکتری (امتیاز ۰.۹۱)" }',
          realRuntimeBehavior: 'استنتاج ماتریس توجه دوطرفه (Full Cross-Attention) در کمتر از ۷۵ میلی‌ثانیه',
          simulatedBehavior: 'شبیه‌سازی تفاوت امتیاز بین قطعات عمومی مرخصی و قطعات خاص مرخصی استعلاجی',
          aiSuggestedReasoning: 'کنار گذاشتن قطعات مربوط به مرخصی زایمان یا ماموریت خارج از کشور که در جستجوی اولیه آمده بودند',
          status: 'completed'
        },
        {
          stepNumber: 4,
          phaseName: 'سنتز پاسخ مقید به سند',
          componentInvolved: 'Constrained Generator',
          actionSummary: 'تولید متن پاسخ به همراه ذکر دقیق بندها، مدارک مورد نیاز و فرآیند سامانه آموزش',
          inputPayload: '{ prompt: "فقط و فقط با تکیه بر قطعات زیر پاسخ دهید...", context: "[ماده ۲۲، تبصره ۱...]" }',
          outputPayload: '{ answer: "بر اساس ماده ۲۲ آیین‌نامه دکتری، دانشجویان در صورت بروز بیماری حاد با تایید کمیسیون پزشکی...", citations: ["ماده ۲۲", "تبصره ۱ ماده ۲۲"] }',
          realRuntimeBehavior: 'فراخوانی مدل زبانی با دمای پایین (Temperature=0.1) جهت جلوگیری کامل از خلاقیت نابجا',
          simulatedBehavior: 'شبیه‌سازی بازخورد کاربر نسبت به وجود شماره ماده و ارجاع رسمی',
          aiSuggestedReasoning: 'استدلال مدل در خصوص ترتیب مراحل اداری: ابتدا بارگذاری مدارک در سامانه گلستان، سپس ارجاع به بهداری دانشگاه',
          status: 'completed'
        },
        {
          stepNumber: 5,
          phaseName: 'اعتبارسنجی استناد و تایید حقیقت',
          componentInvolved: 'Citation Verification Guardrail',
          actionSummary: 'بررسی خودکار اینکه آیا عبارت "سقف ۲ نیمسال" واقعا در سند پیوست وجود دارد یا خیر',
          inputPayload: '{ generatedFacts: ["حداکثر ۲ نیمسال", "تایید کمیسیون پزشکی"], sourceDoc: "[متن ماده ۲۲]" }',
          outputPayload: '{ allFactsGrounded: true, hallucinationRiskScore: 0.01, passed: true }',
          realRuntimeBehavior: 'تطابق موجودیت‌های متنی (NLI Entailment) میان ادعاها و متن منبع',
          simulatedBehavior: 'شبیه‌سازی مسدودسازی پاسخی فرضی که در آن به اشتباه ۳ نیمسال ذکر شده باشد',
          aiSuggestedReasoning: 'تایید نهایی برای انتشار در کلاینت دانشجو همراه با لینک دانلود فرم کمیسیون پزشکی',
          status: 'completed'
        }
      ]
    },

    designDecisionAnalysis: {
      contextAndDriver: 'برای پاسخ به پرسش‌های آیین‌نامه‌ای دانشگاهی، آیا باید مدل زبانی را با کل متون آیین‌نامه‌ها Fine-Tune کنیم یا از معماری RAG ترکیبی با اسناد ساختاریافته استفاده نماییم؟',
      solutionA: {
        name: 'تنظیم دقیق اختصاصی مدل (Domain-Specific Fine-Tuning)',
        architectureType: 'Parametric Knowledge Storage in Model Weights',
        description: 'آموزش یک مدل زبانی روی تمامی جزوات، مصوبات و آیین‌نامه‌های دانشگاه جهت ذخیره دانش در وزن‌های داخلی شبکه عصبی.',
        strengths: [
          'عدم نیاز به خط‌لوله بازیابی و پایگاه برداری در هنگام استنتاج (سادگی پایپ‌لاین زمان اجرا)',
          'توانایی درک اصطلاحات خاص و لحن نگارش آیین‌نامه‌ها به صورت ذاتی'
        ],
        weaknesses: [
          'توهم پنهان (Catastrophic Hallucination): مدل ممکن است تبصره‌های سال‌های مختلف را با هم ترکیب کند و پاسخی باورپذیر اما غلط تولید کند.',
          'ناتوانی در ارجاع مستقیم: مدل نمی‌تواند صفحه، پاراگراف و فایل PDF مرجع را با قطعیت لینک دهد.',
          'هزینه و زمان سرسام‌آور بازآموزی با هر مصوبه جدید شورای دانشگاه (نبود پویایی اطلاعاتی).',
          'ناتوانی در کنترل دسترسی: دانشجوی کارشناسی ممکن است به اسرار امتحانی یا مصوبات محرمانه آموخته شده در وزن‌ها دست یابد.'
        ],
        costLatencyFactor: 'هزینه آموزش بسیار بالا (GPUهای A100)، تاخیر کم در زمان استنتاج اما هزینه سنگین نگهداری'
      },
      solutionB: {
        name: 'معماری RAG هیبریدی با استناد دوطرفه (Hybrid RAG with Strict Grounding)',
        architectureType: 'Non-Parametric External Knowledge Retrieval',
        description: 'جداسازی حافظه دانشی (پایگاه برداری اسناد) از موتور استدلال (مدل زبانی)، به طوری که مدل تنها به عنوان مفسر و نگارش‌گر اسناد بازیافتی عمل می‌کند.',
        strengths: [
          'استناد شفاف و قانونی به شماره مواد و امکان دانلود برگه بخشنامه رسمی توسط دانشجو',
          'به‌روزرسانی در لحظه: افزودن یا ابطال مصوبات در چند ثانیه بدون نیاز به هیچ‌گونه بازآموزی مدل',
          'کنترل دقیق سطح دسترسی (RBAC) بر روی اسناد پیش از بازیابی',
          'کاهش احتمال توهم به کمتر از ۱٪ به واسطه مقیدسازی مدل به کانتکست ورودی'
        ],
        weaknesses: [
          'سربار زمانی موتور جستجوی برداری و بازرتبه‌بندی (حدود ۱۰۰ تا ۲۰۰ میلی‌ثانیه افزایش تاخیر)',
          'نیاز به طراحی پیچیده خط‌لوله هضم اسناد فارسی و تقطیع درست ساختار آیین‌نامه‌ها'
        ],
        costLatencyFactor: 'هزینه نگهداری بسیار ارزان‌تر از فاین‌تیون؛ سربار تاخیر ناچیز قابل چشم‌پوشی در برابر دقت حقوقی'
      },
      tradeOffAnalysis: [
        {
          dimension: 'صحت اطلاعاتی و جلوگیری از توهم (Faithfulness & Hallucination)',
          solutionAAssessment: 'ضعیف: دانش فشرده شده در وزن‌ها به شدت در معرض توهم ارقام و شماره مواد است.',
          solutionBAssessment: 'عالی: مدل تنها مجاز به استفاده از حقایق صریح موجود در اسناد واکشی شده است.',
          winner: 'B',
          justification: 'در امور دانشگاهی یک رقم اشتباه در معدل یا نمره قبولی، تبعات غیرقابل جبران دارد.'
        },
        {
          dimension: 'پویایی و هزینه به‌روزرسانی (Freshness & Agility)',
          solutionAAssessment: 'بسیار ضعیف: برای هر اصلاحیه آیین‌نامه باید فرآیند فاین‌تیون و ارزیابی مجدد تکرار شود.',
          solutionBAssessment: 'فوق‌العاده سریع: سند جدید آپلود می‌شود و بلافاصله در جستجوی بعدی در دسترس است.',
          winner: 'B',
          justification: 'شوراهای دانشگاهی مکرراً در طول نیمسال مصوبات جدید و استثنائات تحصیلی تصویب می‌کنند.'
        },
        {
          dimension: 'شفافیت و قابلیت استناد حقوقی (Explainability & Auditability)',
          solutionAAssessment: 'جعبه سیاه: مشخص نیست مدل بر چه اساسی این پاسخ را تولید کرده است.',
          solutionBAssessment: 'کاملا شفاف: ذکر صریح نام آیین‌نامه، شماره صفحه، ماده و تبصره.',
          winner: 'B',
          justification: 'دانشجو برای مراجعه به آموزش نیازمند استناد به بند قانونی رسمی است نه صرفا یک متن چت‌بات.'
        },
        {
          dimension: 'سادگی پایپ‌لاین نرم‌افزاری (Architectural Simplicity)',
          solutionAAssessment: 'ساده‌تر در زمان اجرا (تنها فراخوانی مدل بدون دیتابیس برداری).',
          solutionBAssessment: 'دارای اجزای متعدد (امبدینگ، وکتور دیتابیس، رنکر و رگولیشن پارسر).',
          winner: 'A',
          justification: 'با این حال، پیچیدگی استقرار RAG در برابر مزایای غیرقابل رقابت آن در دقت پذیرفته می‌شود.'
        }
      ],
      finalArchitecturalChoice: 'الگوی Hybrid RAG با بازرتبه‌بندی Cross-Encoder بدون تردید انتخاب قطعی است.',
      doctoralRationale: 'تحلیل نیازمندی‌های آموزش عالی نشان می‌دهد که «استنادپذیری حقوقی» و «به‌روز بودن مصوبات» دو مشخصه غیرقابل مصالحه هستند. معماری RAG با نگاشت غیرپارامتریک دانش، ریسک‌های فاجعه‌بار فاین‌تیونینگ را خنثی ساخته و سیستمی شفاف و قابل دفاع برای پاسخگویی به آیین‌نامه‌ها فراهم می‌کند.'
    },

    evaluation: {
      overview: 'تحلیل آسیب‌پذیری‌ها و ارزیابی معماری RAG در پردازش متون حقوقی و آموزشی دانشگاه:',
      risksAndMitigations: [
        {
          id: 'rag-risk-1',
          riskTitle: 'تضاد زمانی و عدم تفکیک سال ورود دانشجو (Temporal Discrepancy & Cohort Confusion)',
          severity: 'بحرانی',
          architecturalVulnerability: 'در پایگاه اسناد، آیین‌نامه‌های سال‌های ۱۳۹۳، ۱۳۹۷ و ۱۴۰۲ وجود دارند. دانشجو ورودی ۱۴۰۱ ممکن است به اشتباه بر اساس آیین‌نامه ۱۴۰۲ (که شاید سخت‌گیرانه‌تر است) پاسخ دریافت کند.',
          concreteConsequence: 'محرومیت ناحق دانشجو از سنوات یا فرصت‌های تحصیلی به دلیل اعمال بخشنامه عطف‌به‌ماسبق نشده.',
          remedialStrategy: 'توسعه سازوکار فیلترینگ سخت‌گیرانه زمانی و برچسب‌گذاری چندبعدی متادیتا (Metadata Temporal Scoping) متصل به شناسه ورودی دانشجو.',
          architecturalRevision: 'افزودن جدول تطبیق سال ورود در ماژول پیش‌پردازش RAG؛ هر بازیابی به طور اجباری فیلتر `valid_for_cohort = student_cohort_year` را در پایگاه برداری اعمال می‌نماید.',
          isoImpact: 'ارتقای قابلیت انطباق عملکردی (Functional Suitability) و جلوگیری از خطای سیستمی.'
        },
        {
          id: 'rag-risk-2',
          riskTitle: 'شکست تقطیع و از دست رفتن پیوستگی تبصره‌ها (Semantic Boundary Fragmentation)',
          severity: 'بالا',
          architecturalVulnerability: 'تقطیع صرفا بر اساس تعداد کلمات (مثلا کات کردن هر ۵۰۰ توکن) سبب می‌شود متن یک ماده در یک قطعه و تبصره استثنای آن در قطعه دیگر بیفتد.',
          concreteConsequence: 'مدل فقط اصل ماده را بازیابی کرده و از وجود تبصره معافیت بی‌خبر می‌ماند و به دانشجو پاسخ منفی غلط می‌دهد.',
          remedialStrategy: 'پیاده‌سازی تقطیع ساختاریافته درختی (Grammar-Aware Legal Chunking) که هرگز ماده را از تبصره‌های ذیل آن جدا نمی‌کند و در صورت طولانی بودن، سربرگ ماده را در تمام تکه‌ها تکرار می‌کند.',
          architecturalRevision: 'توسعه پارسر اختصاصی آیین‌نامه‌های وزارت عتف با تحلیل Regex و درخت وابستگی فصول.',
          isoImpact: 'ارتقای دقت بازیابی (Retrieval Recall) و جلوگیری از پاسخ‌های ناقص حقوقی.'
        },
        {
          id: 'rag-risk-3',
          riskTitle: 'افت کیفیت جستجو در اصطلاحات اختصاصی مخفف (Lexical-Semantic Mismatch)',
          severity: 'متوسط',
          architecturalVulnerability: 'مدل‌های امبدینگ عمومی ممکن است مخفف‌های خاص دانشگاهی مانند «کمیسیون موارد خاص»، «ترم تابستان»، «تطبیق واحد» یا «کد دروس عمومی» را به درستی درک نکنند.',
          concreteConsequence: 'بازیابی اسناد نامرتبط و اعلام عدم یافتن پاسخ به دانشجو.',
          remedialStrategy: 'ترکیب موتور جستجوی برداری با ایندکس واژگانی BM25 تقویت شده با فرهنگ اصطلاحات (Thesaurus Expansion) دانشگاهی و بازرتبه‌بندی Cross-Encoder.',
          architecturalRevision: 'پیکربندی خط‌لوله ادغام رتبه متقابل (Reciprocal Rank Fusion - RRF) با ضرایب وزن‌دهی بهینه‌شده.',
          isoImpact: 'بهبود قابلیت استفاده (Usability) و افزایش نرخ موفقیت بازیابی اسناد مرتبط به بالای ۹۶٪.'
        }
      ],
      resilienceScorecard: [
        { metric: 'وفاداری به اسناد (Faithfulness Metric)', beforeMitigation: '۷۳٪ (با مدلهای عمومی بدون Reranker)', afterMitigation: '۹۸.۴٪ (با Reranker و فیلتر زمانی)' },
        { metric: 'نرخ خطای توهم در شماره مواد قانونی', beforeMitigation: '۲۱٪ پاسخ‌ها دارای ارقام نادرست', afterMitigation: 'کمتر از ۰.۵٪ (با ممیزی خودکار استنادات)' },
        { metric: 'سرعت به‌روزرسانی قوانین جدید', beforeMitigation: 'نیازمند چند روز تست بازآموزی', afterMitigation: 'آنی (کمتر از ۱۰ ثانیه پس از بارگذاری PDF)' }
      ]
    },

    phase4: {
      rationale: {
        problemTackled: 'عدم اتکاپذیری مدل‌های زبانی عمومی و تولید توهم در پاسخ به مقررات حساس، تبصره‌ها و جداول اداری آموزش عالی.',
        architecturalNecessity: 'تضمین سندیت و مشروعیت حقوقی خروجی‌ها از طریق پیوند اجباری هر جمله با اسناد معتبر منتشر شده توسط دانشگاه.',
        coreMechanism: 'معماری دو‌مرحله‌ای بازیابی هیبریدی (Sparse + Dense) و ارزیابی مجدد تقاطعی برای تزریق مطمئن‌ترین اطلاعات به پنجره توجه مدل.'
      },
      interaction: {
        partnerPattern: 'Planning (عامل برنامه‌ریزی و استدلال)',
        interactionName: 'تجزیه هدف و جستجوی چندمرحله‌ای زیرپرسش‌ها',
        interfaceContract: '`RAGService.queryContext(subGoal, constraints)`',
        synergyBenefit: 'عامل برنامه‌ریزی (Planning) سوالات ترکیبی پیچیده دانشجو را به چند زیرهدف تجزیه کرده و برای هر زیرهدف، یک استعلام هدفمند از RAG انجام می‌دهد و نتایج را ترکیب می‌کند.',
        dependencyRisk: 'در صورت بازگشت نتایج متناقض از دو سند مختلف در دو زیرپرسش، موتور برنامه‌ریزی ممکن است دچار بن‌بست تصمیم‌گیری شود.',
        sequenceDescription: '۱. دانشجو سوال پیچیده مطرح می‌کند -> ۲. موتور Planning سوال را به دو مرحله تفکیک می‌کند -> ۳. برای هر مرحله از RAG استعلام مستقل می‌گیرد -> ۴. RAG پاسخ‌های مستند را برمی‌گرداند -> ۵. موتور Planning نتیجه نهایی را سنتز می‌کند.'
      },
      failureMode: {
        anomalyTitle: 'تضاد و تناقض آشکار میان دو سند معتبر (مثلاً مصوبه سراسری وزارت علوم با شیوه‌نامه داخلی دانشکده)',
        triggerEvent: 'بازیابی دو قطعه با امتیاز بالای یکسان که یکی شرطی را مجاز دانسته و دیگری آن را صریحا منع کرده است.',
        detectionMechanism: 'ماژول سنجش تعارض معنایی (Contradiction Detection) با اجرای تست استلزام منطقی NLI میان اسناد واکشی شده.',
        fallbackOrCircuitBreakerAction: 'سیستم از تولید پاسخ قطعی خودداری کرده و با نمایش متن صریح هر دو مصوبه، دانشجو را به صورت اضطراری به کارشناس آموزش ارجاع می‌دهد.',
        safetyGuarantee: 'جلوگیری قطعی از گمراه کردن دانشجو و سلب مسئولیت حقوقی از سیستم در موارد تضاد مصوبات سازمانی.',
        recoveryStep: 'ثبت رویداد تضاد در داشبورد شورای آموزشی دانشگاه جهت تعیین تکلیف و صدور الحاقیه تفسیری.'
      },
      qualityAttributes: [
        {
          attributeName: 'وفاداری و صحت محتوایی (Faithfulness & Functional Correctness)',
          standardReference: 'ISO/IEC 25010 - بخش Functional Suitability (Functional Correctness)',
          definition: 'میزان انطباق کامل پاسخ‌های تولیدی با حقایق مستند موجود در منابع رسمی آموزشی بدون دخل و تصرف یا حدس و گمان.',
          architecturalTactic: 'استفاده از پرامپتینگ مقید (Closed-Book Constraint)، اعتبارسنجی استناد NLI و نمره بازرتبه‌بندی بالا.',
          metricAndThreshold: 'شاخص وفاداری بر اساس سنجه RAGAS حداقل ۹۵٪ و خطای فکت‌های قانونی صفر.',
          rationaleForAcademicQA: 'در محیط دانشگاهی پاسخ غیردقیق به منزله صدور حکم اشتباه آموزشی است و اعتماد دانشجویان را زایل می‌کند.'
        },
        {
          attributeName: 'قابلیت نگهداری و انطباق‌پذیری (Modifiability & Adaptability)',
          standardReference: 'ISO/IEC 25010 - بخش Maintainability (Modifiability)',
          definition: 'سهولت به‌روزرسانی پایگاه دانش و جایگزینی قوانین و بخشنامه‌ها بدون نیاز به تغییر در کد برنامه یا بازآموزی مدل.',
          architecturalTactic: 'معماری خط‌لوله داده ماژولار و استفاده از پایگاه داده برداری خارج از ساختار شبکه عصبی.',
          metricAndThreshold: 'زمان مورد نیاز برای اعمال یک مصوبه جدید آموزشی در کل سامانه کمتر از ۵ دقیقه.',
          rationaleForAcademicQA: 'با تغییر دوره‌ای ریاست دانشگاه‌ها و سیاست‌های وزارتخانه، آیین‌نامه‌ها مدام بازنگری می‌شوند.'
        }
      ],
      behaviorDistinction: [
        {
          aspect: 'بازیابی اسناد و استخراج اطلاعات',
          realBehavior: 'محاسبه ریاضی بردارها در فضای ۳۸۴ بعدی و اجرای کوئری HNSW روی دیتابیس برداری Qdrant با فیلتر دقیق سال ورود.',
          simulatedBehavior: 'شبیه‌سازی سناریوی تست با بارگذاری ۱,۰۰۰ آیین‌نامه ساختگی و سنجش میانگین زمان بازیابی.',
          aiSuggestedReasoning: 'خلاصه‌سازی متن چندصفحه‌ای آیین‌نامه به زبان ساده دانشجویی و اتصال ضمایم و فلوچارت‌های متنی.'
        },
        {
          aspect: 'تشخیص تناقضات قانونی',
          realBehavior: 'مقایسه تاریخ تصویب در متادیتا؛ سند با تاریخ موخر بر اساس اصل حقوقی «ناسخ و منسوخ» ارجح است.',
          simulatedBehavior: 'شبیه‌سازی خطای زمانی و بررسی عملکرد سیستم در اعلام هشدار عدم انطباق.',
          aiSuggestedReasoning: 'تحلیل لحن سوال برای درک اینکه آیا دانشجو به دنبال استثنائات قانونی (مانند کمیسیون موارد خاص) است یا خیر.'
        }
      ],
      academicReferences: [
        {
          citation: 'Lewis, P., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. Advances in Neural Information Processing Systems (NeurIPS 2020).',
          publicationType: 'کنفرانس',
          relevanceToPattern: 'مقاله مرجع بنیادین معرفی الگوی RAG و ساختار اولیه تلفیق بازیاب غیرپارامتریک با مولد پارامتریک.'
        },
        {
          citation: 'Gao, Y., et al. (2024). Retrieval-Augmented Generation for Large Language Models: A Survey. arXiv:2312.10997.',
          publicationType: 'ژورنال',
          relevanceToPattern: 'بررسی جامع تکنیک‌های پیشرفته Advanced RAG، خط‌لوله‌های هیبریدی و ارزیابی با RAGAS.'
        },
        {
          citation: 'Robertson, S., & Zaragoza, H. (2009). The Probabilistic Relevance Framework: BM25 and Beyond. Foundations and Trends in Information Retrieval.',
          publicationType: 'کتاب مرجع',
          relevanceToPattern: 'اصول نظری و ریاضیات جستجوی دقیق واژگانی با BM25 در ترکیب با بازیابی برداری.'
        }
      ]
    }
  },

  'planning': {
    id: 'planning',
    englishTitle: 'Planning',
    persianTitle: 'الگوی عامل برنامه‌ریزی و استدلال چندمرحله‌ای',
    shortTagline: 'تجزیه مسائل پیچیده دانشگاهی به اهداف خرد، برنامه‌ریزی پویا (ReAct) و هماهنگی ابزارهای پایگاه داده و استعلام مقررات',
    
    intro: {
      problem: 'بسیاری از سوالات دانشجویان تک‌بعدی نیستند؛ بلکه مسائل شرطی مرکب و چندمرحله‌ای هستند. به عنوان مثال: «من ورودی ۱۴۰۱ با معدل ۱۳.۲ هستم؛ آیا می‌توانم ۲۴ واحد بردارم؟ اگر در ترم تابستان معدل الف شوم چطور؟ آیا برای وام ضروری واجدم؟». یک مدل زبانی ساده یا حتی RAG بدون عامل، در برابر چنین سوالاتی به درستی عمل نمی‌کند؛ زیرا نیاز به تجزیه مساله (Problem Decomposition)، بررسی شروط ترتیبی، فراخوانی توابع استعلام کارنامه دانشجو از سیستم گلستان و ارزیابی گام‌به‌گام قوانین دارد. پاسخ‌های بدون برنامه‌ریزی دچار خطای منطقی و بی‌توجهی به پیش‌شرط‌ها می‌شوند.',
      structure: {
        title: 'ساختار الگوی Planning (عامل برنامه‌ریزی ReAct / Plan-and-Solve)',
        description: 'الگوی برنامه‌ریزی عامل‌محور، وظیفه مدیریت جریان تفکر، تصمیم‌گیری درباره گام بعدی، اجرای ابزارها (Tools)، ارزیابی شواهد بازیافتی و ترکیب پاسخ‌ها را بر عهده دارد.',
        subComponents: [
          { name: 'تجزیه‌کننده هدف و تدوین‌گر نقشه', englishName: 'Goal Decomposer & Planner', responsibility: 'شکستن پرسش‌های مرکب دانشجو به درخت اهداف فرعی با روابط وابستگی (Dependency Graph).' },
          { name: 'موتور استدلال ReAct', englishName: 'ReAct Reasoner (Thought -> Action -> Observation)', responsibility: 'گردش در حلقه منظم تفکر، انتخاب ابزار مناسب (استعلام دیتابیس یا بازیابی آیین‌نامه) و مشاهده نتیجه.' },
          { name: 'جعبه‌ابزار دانشگاهی', englishName: 'Academic Toolset & Function Calling', responsibility: 'رابط‌های برنامه‌نویسی استاندارد برای تعامل با سامانه آموزش، کارنامه دانشجو و مخزن RAG.' },
          { name: 'بازبین خودکار و کنترل‌کننده حلقه', englishName: 'Self-Reflection & Loop Guard', responsibility: 'جلوگیری از افتادن عامل در حلقه‌های نامتناهی تکرار و متوقف‌سازی فرآیند در سقف مجاز گام‌ها.' }
        ]
      },
      roleInSystem: 'الگوی Planning نقش مغز متفکر و هماهنگ‌کننده کل سامانه را ایفا می‌کند. این الگو تشخیص می‌دهد که برای پاسخ به سوال، ابتدا باید چه چیزی را از دانشجو بپرسد، چه ابزاری را با چه ورودی‌هایی صدا بزند و چگونه قوانین مختلف را با یکدیگر ترکیب و تطبیق دهد.',
      advantages: [
        'توانایی حل مسائل چندوجهی دانشگاهی با زنجیره استدلال مستند (Chain-of-Thought)',
        'کاهش شدید خطاهای منطقی به واسطه اجرای متوالی و ارزیابی شواهد در هر گام',
        'انعطاف‌پذیری پویا: در صورت شکست در یک مسیر، عامل برنامه جدیدی برای یافتن پاسخ طرح‌ریزی می‌کند',
        'امکان اتصال امن به ابزارهای واقعی (پایگاه داده کارنامه، وضعیت شهریه، صندوق رفاه)'
      ],
      limitations: [
        'افزایش زمان کلی پاسخگویی نهایی به دلیل رفت‌وبرگشت‌های متعدد در حلقه استدلال',
        'هزینه بالاتر توکن‌ها ناشی از تکرار تاریخچه تفکرات و مشاهدات در پرامپت‌ها',
        'خطر گرفتار شدن در بن‌بست استدلال (Reasoning Loops) در صورت ابهام شدید در سوال دانشجو'
      ],
      useCasesInUniversity: [
        'بررسی جامع شرایط فارغ‌التحصیلی و تطبیق ۱۲۰ واحد درسی گذرانده شده با چارت آموزشی مصوب',
        'محاسبه دقیق وضعیت تراز مالی، شرایط سنوات تحصیلی، و تخفیف‌های شهریه بر اساس معدل',
        'راهنمایی دانشجویان برای فرآیند پیچیده انصراف، تغییر رشته درون‌دانشگاهی یا اخذ مدرک معادل'
      ]
    },

    architecture: {
      overview: 'معماری Planning در این سامانه از الگوی Plan-and-Solve و حلقه اجرایی ReAct (Reasoning + Acting) استفاده می‌کند و از طریق سیستم حالت متناهی قطعی (Deterministic State Machine) مدیریت می‌شود.',
      components: [
        {
          id: 'plan-decomposer',
          name: 'تجزیه‌کننده هدف و تشکیل گراف وابستگی',
          englishName: 'Plan Decomposer & DAG Builder',
          type: 'agent',
          description: 'تحلیل نحو و معنای سوال دانشجو و ترسیم یک گراف جهت‌دار بدون دور (DAG) از اقدامات لازم.',
          responsibilities: ['تشخیص زیرمسائل', 'تعیین ترتیب تقدم و تاخر عملیات استعلامی'],
          interfaces: ['DAG Execution Context'],
          slaOrProtocol: 'زمان استخراج نقشه اولیه: زیر ۳۵۰ میلی‌ثانیه'
        },
        {
          id: 'plan-react-engine',
          name: 'موتور حلقه استدلال ReAct',
          englishName: 'ReAct Agent Execution Engine',
          type: 'agent',
          description: 'پیاده‌سازی متوالی چرخه: تفکر (Thought) -> فراخوانی ابزار (Action) -> دریافت نتیجه (Observation).',
          responsibilities: ['انتخاب ابزار بهینه در هر گام', 'توقف فرآیند به محض کامل شدن شواهد لازم'],
          interfaces: ['Function Calling Schema / JSON Schema'],
          slaOrProtocol: 'حداکثر سقف ۵ گام برای هر درخواست'
        },
        {
          id: 'plan-tools',
          name: 'رجیستری ابزارهای معتبر دانشگاهی',
          englishName: 'University Tools Registry',
          type: 'pipeline',
          description: 'مجموعه ابزارهای اعتبارسنجی شده شامل استعلام آیین‌نامه از طریق RAG، بررسی وضعیت ترم در گلستان و محاسبه‌گر معدل.',
          responsibilities: ['اجرای توابع با ورودی‌های کنترل شده', 'بررسی دسترسی و امنیت اجرای اکشن‌ها'],
          interfaces: ['ToolRegistry.invoke(toolName, args)'],
          slaOrProtocol: 'انزوای کامل و زمان اجرای زیر ۱۰۰ میلی‌ثانیه برای هر ابزار'
        },
        {
          id: 'plan-reflection',
          name: 'ناظر بازتاب و مهارکننده حلقه',
          englishName: 'Self-Reflection & Loop Circuit Breaker',
          type: 'security',
          description: 'پایش گام‌ها برای پیشگیری از تکرار بیهوده یا خطای فراخوانی توابع.',
          responsibilities: ['شمارش گام‌های صرف شده', 'توقف اضطراری در صورت تکرار یک ابزار بیش از ۲ بار با ورودی یکسان'],
          interfaces: ['ExecutionMonitor Listener'],
          slaOrProtocol: 'سقف خطای قابل تحمل: صفر حلقه تکراری'
        }
      ],
      relationships: [
        {
          source: 'Plan Decomposer',
          target: 'ReAct Agent Execution Engine',
          relationType: 'تزریق نقشه اقدام',
          protocol: 'Execution Graph Injection',
          description: 'تحویل لیست گام‌های منطقی برای آغاز پیمایش استدلالی.'
        },
        {
          source: 'ReAct Agent Execution Engine',
          target: 'University Tools Registry',
          relationType: 'فراخوانی توابع (Function Calling)',
          protocol: 'JSON RPC Tool Contract',
          description: 'ارسال درخواست استعلام به سرویس‌های RAG یا دیتابیس آموزشی دانشگاه.'
        },
        {
          source: 'University Tools Registry',
          target: 'ReAct Agent Execution Engine',
          relationType: 'بازخورد نتیجه به عنوان Observation',
          protocol: 'Structured Payload Callback',
          description: 'دریافت خروجی ابزار و قرار دادن آن در کانتکست جهت تفکر مرحله بعد.'
        },
        {
          source: 'Self-Reflection Monitor',
          target: 'ReAct Agent Execution Engine',
          relationType: 'پایش و قطع اضطراری',
          protocol: 'Watchdog Interceptor',
          description: 'نظارت بر عدم تجاوز از سقف مجاز توکن و زمان اجرای عامل.'
        }
      ],
      dataAndControlFlow: [
        {
          step: 1,
          from: 'دانشجو',
          to: 'Plan Decomposer',
          action: 'ارسال پرسش چندبخشی درباره شرایط برداشتن واحد، مشروطی و هم‌نیازی',
          payloadType: 'ComplexQueryString',
          description: 'سیستم پرسش را دریافت کرده و متوجه وجود ۳ شرط مستقل می‌شود.'
        },
        {
          step: 2,
          from: 'Plan Decomposer',
          to: 'ReAct Engine (گام اول تفکر)',
          action: 'تولید Thought 1: برای پاسخ، ابتدا باید وضعیت معدل ترم قبل دانشجو مشخص شود',
          payloadType: 'ThoughtPayload { reasoning: "نیاز به بررسی کارنامه ترم گذشته در سامانه آموزشی" }',
          description: 'عامل اولین اقدام را فراخوانی ابزار استعلام کارنامه تعریف می‌کند.'
        },
        {
          step: 3,
          from: 'ReAct Engine',
          to: 'University Tools Registry (Action 1)',
          action: 'اجرای تابع `get_student_academic_standing(studentId)`',
          payloadType: 'ToolInvocation { tool: "get_student_academic_standing" }',
          description: 'ابزار، وضعیت مشروطی و معدل ۱۲.۹۰ را از سامانه به عنوان Observation 1 بازمی‌گرداند.'
        },
        {
          step: 4,
          from: 'ReAct Engine (گام دوم تفکر)',
          to: 'RAG Module (Action 2)',
          action: 'تولید Thought 2: چون دانشجو مشروط است، استعلام آیین‌نامه سقف واحد دانشجوی مشروط لازم است',
          payloadType: 'ToolInvocation { tool: "query_rag_bylaw", query: "سقف واحد مجاز دانشجوی مشروط کارشناسی" }',
          description: 'ابزار RAG ماده ۱۶ را مبنی بر سقف حداکثر ۱۴ واحد بازمی‌گرداند.'
        },
        {
          step: 5,
          from: 'ReAct Engine',
          to: 'Synthesizer & Formatter',
          action: 'تولید Thought 3: تمام شواهد جمع‌آوری شد؛ تدوین پاسخ نهایی شفاف و شرطی',
          payloadType: 'FinalStructuredAnswer',
          description: 'ترکیب نمرات دانشجو با بند قانونی و ارائه پاسخ تحلیلی شفاف به دانشجو.'
        }
      ]
    },

    scenario: {
      scenarioTitle: 'محاسبه پیش‌شرط‌های دفاع پایان‌نامه ارشد، مقالات مصوب و سنوات مجاز برای دانشجوی ترم ۶',
      studentPersona: 'دانشجوی کارشناسی ارشد مهندسی نرم‌افزار در آستانه اتمام سنوات تحصیلی',
      queryExample: 'من در ترم ۶ ارشد هستم. آیا می‌توانم بدون داشتن مقاله چاپ شده دفاع کنم؟ اگر تمدید سنوات نگیرم عواقبش چیه و نمره نهایی چطور محاسبه میشه؟',
      queryContext: 'شامل چند مسئله وابسته: سنوات مجاز مقطع ارشد، شرایط مقاله برای اجازه دفاع، و بازه زمانی ثبت نمره و تمدید سنوات.',
      expectedOutcome: 'برنامه‌ریزی ۳ گامی: ۱. استعلام سنوات مجاز ارشد از آیین‌نامه، ۲. استعلام مصوبه پژوهشی دانشکده برای چاپ مقاله، ۳. ترکیب شروط و صدور نقشه اقدام قطعی به دانشجو.',
      steps: [
        {
          stepNumber: 1,
          phaseName: 'تجزیه هدف و استخراج پیش‌نیازها',
          componentInvolved: 'Goal Decomposer',
          actionSummary: 'تفکیک سوال به ۳ زیرهدف مشخص: وضعیت سنوات ترم ۶، الزام داشتن مقاله قبل یا بعد از دفاع، و کسر نمره',
          inputPayload: '{ fullQuery: "ترم ۶ ارشد... دفاع بدون مقاله... تمدید سنوات..." }',
          outputPayload: '{ subGoals: ["سنوات مجاز ارشد", "شرایط مقاله دفاع", "محاسبه نمره دفاع"], planGraph: "SubGoal1 -> SubGoal2 -> Synthesis" }',
          realRuntimeBehavior: 'تشکیل ساختار داده DAG در حافظه سرور و مقداردهی متغیرهای اولیه متغیرهای استنتاج',
          simulatedBehavior: 'شبیه‌سازی سناریوی موازی‌سازی دو استعلام اول برای کاهش ۵۰ درصدی تاخیر زمانی',
          aiSuggestedReasoning: 'تشخیص اینکه ترم ۶ فراتر از سقف ۴ ترم مجاز است و نیازمند مجوز کمیسیون موارد خاص است',
          status: 'completed'
        },
        {
          stepNumber: 2,
          phaseName: 'اجرای حلقه ReAct: گام اول (سنوات)',
          componentInvolved: 'ReAct Engine + RAG Tool',
          actionSummary: 'فراخوانی ابزار بازیابی با پرسش "سقف سنوات مجاز کارشناسی ارشد و فرآیند تمدید ترم ۵ و ۶"',
          inputPayload: '{ action: "query_rag_bylaw", args: { query: "سنوات مجاز ارشد و کمیسیون موارد خاص", degree: "MSc" } }',
          outputPayload: '{ observation: "ماده ۱۵: سنوات مجاز ۴ نیمسال است. تمدید ترم ۵ با گروه و ترم ۶ با مجوز کمیسیون موارد خاص دانشگاه امکان‌پذیر است." }',
          realRuntimeBehavior: 'ارسال درخواست به ماژول RAG و دریافت پاراگراف تایید شده ماده ۱۵',
          simulatedBehavior: 'شبیه‌سازی تطابق قوانین دانشگاه با مقررات سراسری وزارت عتف',
          aiSuggestedReasoning: 'نتیجه‌گیری واسط: دانشجو حتما باید پیش از هر اقدامی تاییدیه کمیسیون موارد خاص برای ترم ۶ را اخذ کرده باشد',
          status: 'completed'
        },
        {
          stepNumber: 3,
          phaseName: 'اجرای حلقه ReAct: گام دوم (شرایط مقاله)',
          componentInvolved: 'ReAct Engine + Research Bylaw Tool',
          actionSummary: 'فراخوانی ابزار استعلام مقررات پژوهشی دانشگاه درباره مقالات مجاز برای دفاع ارشد',
          inputPayload: '{ action: "query_rag_bylaw", args: { query: "ارائه مقاله برای دفاع ارشد و کسر نمره پایان‌نامه" } }',
          outputPayload: '{ observation: "مصوبه شورا: دفاع بدون مقاله با سقف نمره ۱۸ امکان‌پذیر است؛ ۲ نمره باقیمانده منوط به ارائه پذیرش مقاله در بازه ۶ ماهه است." }',
          realRuntimeBehavior: 'بازیابی مصوبه شورای پژوهشی دانشگاه و تطبیق تاریخی سال تصویب',
          simulatedBehavior: 'شبیه‌سازی استخراج فرمول محاسبه نمره: پایه ۱۸ + ۲ نمره تشویقی مقاله علمی',
          aiSuggestedReasoning: 'بررسی اینکه دانشجو مجبور به تعویق دفاع نیست، اما باید بداند سقف نمره‌اش ۱۸ خواهد بود مگر آنکه پذیرش بیاورد',
          status: 'completed'
        },
        {
          stepNumber: 4,
          phaseName: 'ارزیابی خودبازتابی و سلامت استدلال',
          componentInvolved: 'Self-Reflection Guard',
          actionSummary: 'بررسی اینکه آیا هر سه بخش سوال دانشجو پوشش داده شد و تناقضی وجود ندارد؟',
          inputPayload: '{ currentObservations: 2 items, originalSubGoals: 3 items }',
          outputPayload: '{ allConditionsSatisfied: true, noContradictionDetected: true, proceedToFinalSynthesis: true }',
          realRuntimeBehavior: 'ارزیابی درخت تصمیم قطعی با سنجه‌های کنترلی پیش از صدور توکن‌های خروجی',
          simulatedBehavior: 'شبیه‌سازی جلوگیری از حلقه سوم اضافی به دلیل کامل بودن اطلاعات',
          aiSuggestedReasoning: 'تایید کفایت شواهد برای نتیجه‌گیری جامع و بدون ابهام',
          status: 'completed'
        },
        {
          stepNumber: 5,
          phaseName: 'ترکیب و ارائه نقشه راه اداری به دانشجو',
          componentInvolved: 'Final Response Synthesizer',
          actionSummary: 'تولید پاسخ گام‌به‌گام با اولویت‌بندی اداری: ۱. اقدام فوری برای کمیسیون موارد خاص، ۲. هماهنگی جلسه دفاع، ۳. مهلت ۶ ماهه مقاله',
          inputPayload: '{ synthesizedFacts: [...] }',
          outputPayload: '{ markdownRoadmap: "۱. اولویت اول: ثبت درخواست تمدید در کمیسیون... ۲. دفاع بدون مقاله مجاز است اما...", auditTrail: ["ماده ۱۵ سنوات", "مصوبه پژوهشی بند ۳"] }',
          realRuntimeBehavior: 'تولید متن نهایی و ثبت شناسه پیگیری در لاگ سیستم جهت ممیزی آتی',
          simulatedBehavior: 'شبیه‌سازی رضایت‌سنجی دانشجو از دریافت نقشه راه شفاف به جای متن‌های مبهم کلیشه‌ای',
          aiSuggestedReasoning: 'تنظیم ساختار پیام به صورت مراحل زمان‌بندی شده تا از اخراج تحصیلی ناخواسته دانشجو جلوگیری شود',
          status: 'completed'
        }
      ]
    },

    designDecisionAnalysis: {
      contextAndDriver: 'برای مدیریت فرآیندهای چندمرحله‌ای و شرطی دانشگاهی، آیا باید یک موتور سخت‌کد و قطعی قوانین (Rule-Based Workflow / BPMS) توسعه داد یا از معماری عامل هوشمند استدلال‌گر (Agentic ReAct Planning with Guardrails) استفاده نمود؟',
      solutionA: {
        name: 'موتور گردش کار قوانین قطعی و درخت تصمیم ثابت (Hardcoded Rule Engine & BPMS)',
        architectureType: 'Deterministic Rule-Based Expert System (e.g., Drools / Camunda BPMS)',
        description: 'کدنویسی تمامی قوانین در قالب ساختارهای شرطی If-Then و نمودارهای گردش کار صلب BPMN.',
        strengths: [
          'قطعیت مطلق ۱۰۰٪ در خروجی ریاضی و شفافیت ریاضی کامل مسیر اجرا',
          'عدم وجود خطای تصادفی یا توهم ناشی از ماهیت احتمالی مدل‌های هوش مصنوعی'
        ],
        weaknesses: [
          'عدم انعطاف‌پذیری در فهم زبان طبیعی و ناتوانی در مواجهه با سوالات مبهم یا ناقص دانشجویان',
          'هزینه کمرشکن توسعه و نگهداری: با تغییر یک قانون، برنامه‌نویسان باید دیاگرام‌ها و کدهای درختی را بازنویسی کنند.',
          'ناتوانی در تلفیق مفاد تفسیری و کیفی آیین‌نامه‌ها که فرمول ریاضی ندارند (مانند ارزیابی موارد خاص و عذر موجه).'
        ],
        costLatencyFactor: 'سرعت اجرا بسیار بالا (میلی‌ثانیه)، اما هزینه تولید و نگهداری فوق‌العاده بالا و انعطاف‌پذیری نزدیک به صفر'
      },
      solutionB: {
        name: 'معماری عامل برنامه‌ریزی ReAct با محافظ‌های قطعی (Agentic Planning with Guardrails)',
        architectureType: 'Neuro-Symbolic Agent Architecture (LLM Planner + Deterministic Guardrails)',
        description: 'استفاده از مدل زبانی به عنوان تحلیل‌گر زبان طبیعی و طراح نقشه حل مساله، در حالی که اجرای هر گام توسط ابزارهای تاییدشده و محافظ‌های قطعی کنترل می‌شود.',
        strengths: [
          'درک بی‌نظیر سوالات پیچیده، چندبعدی، ناقص و محاوره‌ای دانشجویان و استخراج دقیق نیت',
          'پویایی و تطبیق‌پذیری: عامل در صورت ابهام می‌تواند از خود دانشجو سوال تکمیلی بپرسد (Clarification Dialogue)',
          'قابلیت اتصال آسان به ابزارهای جدید بدون نیاز به بازنویسی کل گراف فرآیند',
          'ترکیب هوش زبانی با استناد دقیق RAG در هر مرحله'
        ],
        weaknesses: [
          'افزایش تاخیر زمانی پردازش به دلیل اجرای چند گام متوالی در حلقه ReAct',
          'نیاز به سیستم‌های ناظر قوی (Loop Detectors) برای جلوگیری از رفتار غیرمنتظره عامل'
        ],
        costLatencyFactor: 'مصرف توکن بالاتر، تاخیر بین ۱.۵ تا ۳ ثانیه، اما تجربه کاربری فوق‌العاده و تطبیق‌پذیری بالا'
      },
      tradeOffAnalysis: [
        {
          dimension: 'انعطاف در فهم زبان و استخراج نیت (Natural Language Understanding)',
          solutionAAssessment: 'بسیار ضعیف: دانشجو باید فرم‌های از پیش تعریف شده را پر کند؛ چت آزاد ناممکن است.',
          solutionBAssessment: 'بسیار قوی: تحلیل جملات محاوره‌ای و استخراج شروط حتی اگر به صورت نامرتب بیان شده باشند.',
          winner: 'B',
          justification: 'دانشجویان معمولا ادبیات حقوقی را نمی‌دانند و به صورت گفتاری و درهم ابراز نگرانی می‌کنند.'
        },
        {
          dimension: 'هزینه نگهداری و گسترش‌پذیری (Extensibility & Maintainability)',
          solutionAAssessment: 'کابوس نگهداری: هر بخشنامه جدید مستلزم تغییر در ده‌ها خط کد شرطی و درخت منطقی است.',
          solutionBAssessment: 'انعطاف‌پذیر: افزودن یک ابزار یا یک متن بخشنامه در RAG برای فهم عامل کافی است.',
          winner: 'B',
          justification: 'سیستم‌های دانشگاهی به طور مداوم با شیوه‌نامه‌های فصلی و موقت مواجه می‌شوند.'
        },
        {
          dimension: 'قابلیت پیش‌بینی و قطعیت مسیر (Determinism & Predictability)',
          solutionAAssessment: '۱۰۰٪ قابل پیش‌بینی و بدون کوچک‌ترین انحراف یا رفتار ناشناخته.',
          solutionBAssessment: 'نیازمند کاندیشن‌های کنترلی برای تضمین عدم عبور از گام‌های مجاز.',
          winner: 'A',
          justification: 'با این حال، با افزودن Guardrails به راهکار B می‌توان به قابلیت پیش‌بینی ۹۹٪ دست یافت.'
        },
        {
          dimension: 'تاخیر و منابع پردازشی (Latency & Resource Footprint)',
          solutionAAssessment: 'پاسخ فوری در کمتر از ۱۰ میلی‌ثانیه با منابع ناچیز CPU.',
          solutionBAssessment: 'نیازمند چند صد میلی‌ثانیه برای هر حلقه تفکر و پردازش ابزار.',
          winner: 'A',
          justification: 'در پاسخگویی مشاوره‌ای، تاخیر ۲ الی ۳ ثانیه‌ای برای یک پاسخ تحلیلی کاملا مورد پذیرش کاربر است.'
        }
      ],
      finalArchitecturalChoice: 'معماری هیبریدی Neuro-Symbolic Agentic Planning انتخاب می‌شود.',
      doctoralRationale: 'تلفیق موتور استدلال پویا (LLM Planner) با ابزارهای قطعی نرم‌افزاری (Deterministic Tools & Guardrails)، تعادل مطلوبی میان انعطاف درک زبان طبیعی و رعایت بی‌چون‌وچرای آیین‌نامه‌ها برقرار می‌سازد و از جمود سیستم‌های قدیمی BPMS و بی‌قاعدگی چت‌بات‌های خام فاصله می‌گیرد.'
    },

    evaluation: {
      overview: 'شناسایی و مهار ریسک‌های اختصاصی سیستم‌های عامل‌محور و برنامه‌ریزی خودکار در فرآیندهای تحصیلی:',
      risksAndMitigations: [
        {
          id: 'plan-risk-1',
          riskTitle: 'گرفتار شدن در حلقه نامتناهی استدلال (Infinite ReAct Execution Loops)',
          severity: 'بحرانی',
          architecturalVulnerability: 'اگر خروجی یک ابزار ابهام داشته باشد، عامل ممکن است بارها و بارها همان ابزار را با پارامترهای جزئی تکرار کند و هرگز به گام پاسخ نرسد.',
          concreteConsequence: 'اتمام سهمیه توکن، قفل شدن سرور، و انتظار بی‌پایان دانشجو برای دریافت جواب.',
          remedialStrategy: 'تعبیه سازوکار مدار شکن گام‌ها (Max-Steps Guardrail) با حداکثر ۵ گام، و تشخیص تکرار با تطابق هش عمل و ورودی‌ها (Action-Input Hash Matching).',
          architecturalRevision: 'افزودن کلاس `ExecutionWatchdog` در کنترلر مرکزی؛ به محض شناسایی دومین فراخوانی تکراری یکسان، وضعیت فرآیند به حالت تبیین شکست تغییر می‌کند.',
          isoImpact: 'ارتقای پایداری عملکردی و مدیریت مطمئن استثنائات (Fault Tolerance).'
        },
        {
          id: 'plan-risk-2',
          riskTitle: 'سرریز پنجره کانتکست در تاریخچه‌های طولانی استدلال (Context Window Overflow)',
          severity: 'بالا',
          architecturalVulnerability: 'انباشته شدن زنجیره افکار قبلی، شواهد حجیم بازیافتی از RAG و متادیتاها می‌تواند فراتر از سقف پنجره توجه مدل رود.',
          concreteConsequence: 'فراموشی سوال اولیه دانشجو توسط مدل یا بروز خطای پرامپت با قطع ناگهانی پاسخ.',
          remedialStrategy: 'تکنیک خلاصه‌سازی پیش‌رونده حالات واسط (State Compaction & Scratchpad Pruning)؛ حذف بخش‌های اضافی مشاهدات پیشین و نگه‌داشتن تنها خلاصه حقایق اثبات‌شده.',
          architecturalRevision: 'پیاده‌سازی متد `pruneObservationHistory()` پیش از ارسال هر Thought جدید به مدل زبانی.',
          isoImpact: 'بهبود بهره‌وری منابع و کارایی زمانی.'
        },
        {
          id: 'plan-risk-3',
          riskTitle: 'استنتاج قیاسی غلط از ابزارها و ایجاد پیش‌فرض‌های نادرست (Tool Misuse & Premature Conclusion)',
          severity: 'بالا',
          architecturalVulnerability: 'عامل ممکن است از نتیجه یک ابزار ناقص، نتیجه‌گیری نهایی کند بدون آنکه شروط نفی‌کننده دیگر را استعلام نماید.',
          concreteConsequence: 'اعلام واجد شرایط بودن دانشجو برای فارغ‌التحصیلی بدون بررسی بدهی کتابخانه یا پرونده تاییدیه تحصیلی دیپلم.',
          remedialStrategy: 'تعریف چک‌لیست اعتبارسنجی پیش‌فرض (Checklist Verification Gate) پیش از انتشار پاسخ نهایی.',
          architecturalRevision: 'تعبیه فاز ممیزی نهایی در معماری که وضعیت تمام الزامات اجباری را با متغیر بولی بررسی می‌نماید.',
          isoImpact: 'تضمین صحت عملکردی (Functional Correctness) و انطباق بر آیین‌نامه‌ها.'
        }
      ],
      resilienceScorecard: [
        { metric: 'نرخ موفقیت در حل پرسش‌های چندبخشی', beforeMitigation: '۴۸٪ (با مدلهای بدون برنامه‌ریزی)', afterMitigation: '۹۳.۲٪ (با معماری ReAct و چک‌لیست)' },
        { metric: 'میانگین تعداد گام‌ها تا پاسخ قطعی', beforeMitigation: 'نامعین و مستعد حلقه تکرار', afterMitigation: '۲.۸ گام پایدار با سقف قطعی ۵ گام' },
        { metric: 'جلوگیری از پاسخگویی با اطلاعات ناقص', beforeMitigation: '۳۱٪ موارد دارای غفلت از شروط', afterMitigation: 'کمتر از ۱.۲٪ با دروازه اعتبارسنجی' }
      ]
    },

    phase4: {
      rationale: {
        problemTackled: 'ناتوانی در حل استدلال‌های گام‌به‌گام، سوالات وابسته و مسائلی که نیازمند تجمیع اطلاعات از منابع و سامانه‌های ناهمگن دانشگاهی هستند.',
        architecturalNecessity: 'هدایت هدفمند موتورهای جستجو و ابزارهای دانشگاهی بر مبنای یک استراتژی حل مساله شفاف و قابل بازبینی.',
        coreMechanism: 'چرخه سیستماتیک تفکر، انتخاب ابزار، مشاهده داده‌ها و بازتاب خودکار بر اساس چارچوب ReAct و الگوی Plan-and-Solve.'
      },
      interaction: {
        partnerPattern: 'Model Gateway (درگاه تجرید مدل‌ها)',
        interactionName: 'مدیریت بهینه توکن و فراخوانی بلادرنگ ابزارها',
        interfaceContract: '`ModelGateway.dispatchAgentStep(agentState, toolDefinitions)`',
        synergyBenefit: 'عامل برنامه‌ریزی نیازمند تاخیر بسیار کم در گام‌های تفکر میانی است؛ Model Gateway این گام‌های کوتاه را به مدل‌های محلی سریع یا مدل‌های استنتاجی بهینه هدایت می‌کند تا زمان کل فرآیند کوتاه بماند.',
        dependencyRisk: 'اگر Model Gateway با تاخیر مواجه شود، زمان تجمیعی حلقه ReAct ضرب در تعداد گام‌ها شده و تاخیر کل از حد مجاز خارج می‌شود.',
        sequenceDescription: '۱. عامل وضعیت فعلی را فرموله می‌کند -> ۲. درخواست گام از طریق Model Gateway به مدل با تاخیر پایین ارسال می‌شود -> ۳. مدل ابزار بعدی را پیشنهاد می‌دهد -> ۴. گیت‌وی خروجی توابع را با کانتکست فشرده به عامل تحویل می‌دهد.'
      },
      failureMode: {
        anomalyTitle: 'تله استدلالی و بازگشت داده‌های تهی از سامانه آموزش برای دانشجویان مهمان',
        triggerEvent: 'دانشجوی مهمان شماره دانشجویی وارد می‌کند اما سامانه گلستان اطلاعات کارنامه او را پیدا نمی‌کند؛ عامل مکرراً اقدام به جستجو با ساختارهای دیگر شماره می‌کند.',
        detectionMechanism: 'تشخیص ناهنجاری توسط ناظر بازتاب (Reflection Monitor) با شرط: "یافت نشدن رکورد در دو تلاش پیاپی".',
        fallbackOrCircuitBreakerAction: 'شکستن حلقه جستجوی دیتابیس و تغییر استراتژی عامل به «طرح سوال صریح از دانشجو»: از دانشجو پرسیده می‌شود آیا دانشجوی مهمان یا انتقالی است؟',
        safetyGuarantee: 'سیستم هرگز قفل نمی‌شود و دانشجو را با سوال شفاف در مسیر درست هدایت می‌کند.',
        recoveryStep: 'دریافت پاسخ دانشجو و فعال‌سازی شیوه‌نامه اختصاصی دانشجویان مهمان در RAG.'
      },
      qualityAttributes: [
        {
          attributeName: 'کفایت و جامعیت استدلال (Functional Completeness & Soundness)',
          standardReference: 'ISO/IEC 25010 - بخش Functional Suitability (Completeness)',
          definition: 'اطمینان از اینکه تمامی پیش‌شرط‌ها، تبصره‌ها و ابعاد مختلف سوال دانشجو بدون غفلت مورد بررسی و تحلیل قرار گرفته‌اند.',
          architecturalTactic: 'الگوریتم تجزیه گراف وابستگی (DAG Decomposition) و دروازه اعتبارسنجی چک‌لیست نهایی.',
          metricAndThreshold: 'پوشش ۱۰۰ درصدی شروط بیان‌شده در پرسش و عدم جاافتادن مفاد قانونی.',
          rationaleForAcademicQA: 'غفلت از یک پیش‌نیاز (مثلا شرط نمره قبولی آزمون زبان در دفاع دکتری) می‌تواند کل آینده تحصیلی دانشجو را به مخاطره اندازد.'
        },
        {
          attributeName: 'قابلیت حسابرسی و شفافیت گام‌ها (Auditability & Transparency)',
          standardReference: 'ISO/IEC 25010 - بخش Maintainability (Testability) & Security (Non-repudiation)',
          definition: 'امکان ردیابی، ممیزی و ثبت کامل مراحل تفکر، ابزارهای فراخوانی شده و مشاهدات حاصله برای استناد قانونی بعدی.',
          architecturalTactic: 'لاگ‌گذاری ساختاریافته ردپای استدلال (Execution Trace) در قالب لاگ‌های وقایع غیرقابل تغییر.',
          metricAndThreshold: 'قابلیت بازتولید ۱۰۰٪ زنجیره تصمیم‌گیری با شناسه پیگیری منحصر‌به‌فرد.',
          rationaleForAcademicQA: 'در صورت شکایت یا اعتراض دانشجو به کمیته انضباطی یا آموزشی، ردپای استدلال سیستم سند رسمی دفاع خواهد بود.'
        }
      ],
      behaviorDistinction: [
        {
          aspect: 'کنترل ترتیب مراحل و ماشین حالت',
          realBehavior: 'اجرای کد کنترل جریان جاوااسکریپت/تایپ‌اسکریپت، شمارش قطعی گام‌ها، محدودسازی سقف و قطع اجرای حلقه در صورت نقض شروط.',
          simulatedBehavior: 'شبیه‌سازی فرآیند اتصال به APIهای سامانه گلستان و پایگاه داده رفاهی دانشجویان.',
          aiSuggestedReasoning: 'تصمیم‌گیری انعطاف‌پذیر در خصوص اینکه پس از مشاهده معدل، اکنون کدام ماده آیین‌نامه باید استعلام شود.'
        },
        {
          aspect: 'تشخیص زمان اتمام تفکر',
          realBehavior: 'تحلیل ساختار خروجی JSON و تایید اتمام گام‌ها با اعتبارسنجی وجود فیلد FinalAnswer.',
          simulatedBehavior: 'شبیه‌سازی مقایسه مصرف توکن و زمان پاسخگویی در حالت‌های مختلف تعداد گام‌ها.',
          aiSuggestedReasoning: 'نتیجه‌گیری هوش مصنوعی از تطابق شرایط پرونده دانشجو با مفاد تفسیری بخشنامه‌ها.'
        }
      ],
      academicReferences: [
        {
          citation: 'Yao, S., et al. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. International Conference on Learning Representations (ICLR 2023).',
          publicationType: 'کنفرانس',
          relevanceToPattern: 'مقاله پایه‌ای و بنیان‌گذار الگوی ReAct برای هم‌افزایی استدلال زبانی و فراخوانی ابزارها.'
        },
        {
          citation: 'Wang, L., et al. (2023). Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models. ACL 2023.',
          publicationType: 'کنفرانس',
          relevanceToPattern: 'روش‌شناسی تجزیه مسائل پیچیده به طرح‌های اجرایی پیش از اقدام برای جلوگیری از خطاهای شناختی.'
        },
        {
          citation: 'Wooldridge, M. (2009). An Introduction to MultiAgent Systems (2nd ed.). John Wiley & Sons.',
          publicationType: 'کتاب مرجع',
          relevanceToPattern: 'مبانی نظری سیستم‌های عامل‌محور، معماری BDI (Belief-Desire-Intention) و برنامه‌ریزی خودکار.'
        }
      ]
    }
  }
};
