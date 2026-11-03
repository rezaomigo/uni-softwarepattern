export interface ArchNode {
  id: string;
  title: string;
  englishTitle: string;
  category: 'client' | 'gateway' | 'planning' | 'rag' | 'backend' | 'storage' | 'security';
  patternAffiliation: 'Model Gateway' | 'RAG' | 'Planning' | 'زیرساخت مشترک';
  description: string;
  responsibilities: string[];
  interfaces: string[];
  sla: string;
  iconName: string;
}

export interface ArchEdge {
  id: string;
  from: string;
  to: string;
  label: string;
  protocol: string;
  flowType: 'control' | 'data' | 'feedback';
}

export const SYSTEM_ARCHITECTURE = {
  systemName: 'سامانه پاسخگویی هوشمند به پرسش‌های دانشگاهی',
  englishName: 'Intelligent University Regulation & Student Service QA Architecture',
  courseContext: 'درس طراحی الگوهای نرم‌افزار - مقطع دکتری مهندسی کامپیوتر',
  abstract: 'این معماری، سه الگوی پیشرفته Model Gateway، RAG و Planning را به عنوان یک سیستم یکپارچه با قابلیت اتکا، انعطاف‌پذیری حقوقی، حفظ حریم خصوصی داده‌های آموزشی و تحمل خطای بالا پیوند می‌زند.',
  
  layers: [
    {
      id: 'layer-client',
      name: 'لایه کلاینت و تعامل دانشجویی (Client & Ingress Layer)',
      description: 'درگاه‌های دسترسی دانشجویان، اساتید و کارکنان با پشتیبانی از پروتکل‌های وب، موبایل و بات‌های رسمی دانشگاه.'
    },
    {
      id: 'layer-agent',
      name: 'لایه هماهنگ‌کننده و عامل برنامه‌ریزی (Agentic Planning Layer)',
      description: 'مغز متفکر سیستم بر مبنای الگوی Planning جهت شکست مسائل چندوجهی، هدایت حلقه ReAct و مهار تکرار.'
    },
    {
      id: 'layer-rag',
      name: 'لایه بازیابی دانش و راستی‌آزمایی حقوقی (RAG & Knowledge Layer)',
      description: 'زیرسیستم بازیابی هیبریدی اسناد مصوب وزارت علوم و شورای دانشگاه با رنکر متقاطع و تایید استنادات کلمه‌به‌کلمه.'
    },
    {
      id: 'layer-gateway',
      name: 'لایه درگاه تجرید و تاب‌آوری مدل‌ها (Model Gateway Layer)',
      description: 'میانجی متمرکز جهت کش معنایی، کنترل نرخ، پایش سلامت سرورها، و سوئیچ بین سرورهای بومی دانشگاه و مدل‌های خارجی.'
    },
    {
      id: 'layer-storage',
      name: 'مخازن داده رسمی و زیرساخت مدل‌ها (Data & Compute Foundation)',
      description: 'پایگاه‌های داده سازمانی دانشگاه (گلستان)، مخزن برداری اسناد و خوشه‌های پردازش پردازنده گرافیکی (GPU).'
    }
  ],

  nodes: [
    {
      id: 'node-client',
      title: 'پرتال وب و پیام‌رسان دانشجویی',
      englishTitle: 'Student Web Client & Bot',
      category: 'client',
      patternAffiliation: 'زیرساخت مشترک',
      description: 'رابط کاربری واکنش‌گرا و قابل دسترس با تایپوگرافی خوانا، امکان استعلام سریع و ارزیابی پاسخ‌ها.',
      responsibilities: ['ارسال پرسش‌های آیین‌نامه‌ای', 'نمایش پاسخ‌های مستند با پیوند به PDF مصوبات', 'امکان ارسال اعتراض به آموزش'],
      interfaces: ['HTTPS / WebSocket / SSE'],
      sla: 'زمان بارگذاری صفحه < ۱.۲ ثانیه',
      iconName: 'Layout'
    },
    {
      id: 'node-auth-guard',
      title: 'دروازه امنیت و احراز هویت دانشگاهی',
      englishTitle: 'CAS / SSO & Ingress Guardrail',
      category: 'security',
      patternAffiliation: 'زیرساخت مشترک',
      description: 'اتصال به سامانه SSO دانشگاه، تشخیص هویت، مقطع تحصیلی، سال ورود و پالایش اولیه پرامپت‌ها از حملات تزریق.',
      responsibilities: ['اعتبارسنجی JWT دانشگاه', 'تزریق متادیتای سال ورود و مقطع دانشجو به کانتکست امن', 'فیلتر پرامپت‌های مخرب (Prompt Injection)'],
      interfaces: ['OAuth2 / OIDC / Central Auth Service'],
      sla: 'تاخیر بررسی < ۵ میلی‌ثانیه',
      iconName: 'ShieldCheck'
    },
    {
      id: 'node-planning-agent',
      title: 'عامل برنامه‌ریزی و استدلال ReAct',
      englishTitle: 'Planning & Reasoning Agent (ReAct)',
      category: 'planning',
      patternAffiliation: 'Planning',
      description: 'مغز هماهنگ‌کننده سیستم؛ شکست سوالات چندبخشی، ترسیم گراف وابستگی و اجرای ترتیبی ابزارها.',
      responsibilities: ['تولید زنجیره تفکر (Chain of Thought)', 'فراخوانی ابزارهای RAG و دیتابیس کارنامه', 'مدیریت سقف گام‌ها و جلوگیری از تله استدلالی'],
      interfaces: ['AgentExecutionAPI / ToolRegistry'],
      sla: 'سقف حداکثر ۵ گام استدلالی',
      iconName: 'GitMerge'
    },
    {
      id: 'node-rag-pipeline',
      title: 'خط‌لوله بازیابی افزوده هیبریدی',
      englishTitle: 'Hybrid RAG Pipeline & Reranker',
      category: 'rag',
      patternAffiliation: 'RAG',
      description: 'موتور بازیابی دوسطحی با ترکیب جستجوی برداری HNSW و جستجوی لغوی BM25 و بازرتبه‌بندی دقیق Cross-Encoder.',
      responsibilities: ['فیلتر زمانی بر اساس سال ورود دانشجو', 'استخراج مواد و تبصره‌های مرتبط', 'تایید استناد و عدم توهم با NLI'],
      interfaces: ['RAGQueryService / Qdrant gRPC / Elastic REST'],
      sla: 'زمان بازیابی و رنکینگ < ۹۰ میلی‌ثانیه',
      iconName: 'BookOpen'
    },
    {
      id: 'node-model-gateway',
      title: 'درگاه مدیریت و تجرید مدل‌ها',
      englishTitle: 'Enterprise Model Gateway',
      category: 'gateway',
      patternAffiliation: 'Model Gateway',
      description: 'لایه تجرید و کنترل ترافیک؛ کش معنایی، سوییچ بین سرور محلی و خارجی، کلید مدارشکن و پایش مصرف.',
      responsibilities: ['کشینگ سوالات پرتکرار انتخاب واحد', 'پنهان‌سازی آدرس و کلیدهای ارائه‌دهندگان مدل', 'سوییچ آنی در صورت قطعی اینترنت به کلاستر داخلی'],
      interfaces: ['OpenAI-Compatible REST API / gRPC'],
      sla: 'پاسخ کش < ۲۰ms / سویچ خطا < ۲۵۰ms',
      iconName: 'Cpu'
    },
    {
      id: 'node-local-llm',
      title: 'خوشه پردازش داخلی دانشگاه (vLLM)',
      englishTitle: 'On-Premises Campus Cluster (vLLM)',
      category: 'backend',
      patternAffiliation: 'Model Gateway',
      description: 'سرورهای مجهز به کارت‌های گرافیکی مستقر در دیتاسنتر دانشگاه برای پردازش اطلاعات کارنامه، نمرات و سوابق تحصیلی محرمانه.',
      responsibilities: ['تضمین عدم خروج داده‌های تحصیلی از شبکه دانشگاه', 'فعالیت در شرایط قطع اینترنت بین‌الملل'],
      interfaces: ['vLLM OpenAI-Compatible Endpoint'],
      sla: 'توان عملیاتی: ۸۰ توکن بر ثانیه بر کاربر',
      iconName: 'Server'
    },
    {
      id: 'node-bylaws-db',
      title: 'مخزن رسمی اسناد و پایگاه برداری',
      englishTitle: 'Authoritative Bylaws & Vector DB',
      category: 'storage',
      patternAffiliation: 'RAG',
      description: 'پایگاه داده اسناد مصوب شورای دانشگاه و وزارت علوم همراه با متادیتای نسخه‌بندی و بردارهای معنایی.',
      responsibilities: ['ذخیره قطعات ساختاریافته فصول و مواد', 'پشتیبانی از جستجوی ترکیبی بردار و کلمه کلیدی'],
      interfaces: ['Qdrant Vector Engine + PostgreSQL JSONB'],
      sla: 'پایداری ۹۹.۹۹٪ داده‌ها',
      iconName: 'Database'
    },
    {
      id: 'node-golestan-db',
      title: 'سامانه آموزش دانشگاه (گلستان)',
      englishTitle: 'University SIS / Golestan Database',
      category: 'storage',
      patternAffiliation: 'Planning',
      description: 'بانک اطلاعاتی رسمی سوابق تحصیلی، نمرات، واحدهای گذرانده و وضعیت نظام وظیفه دانشجویان.',
      responsibilities: ['ارائه اطلاعات معتبر کارنامه به ابزارهای تاییدشده عامل برنامه‌ریزی', 'احراز هویت و دسترسی مشروط بر اساس نقش'],
      interfaces: ['Enterprise SOAP / REST Microservices'],
      sla: 'زمان پاسخ وب‌سرویس < ۶۰ میلی‌ثانیه',
      iconName: 'GraduationCap'
    }
  ],

  edges: [
    { id: 'e1', from: 'node-client', to: 'node-auth-guard', label: 'ارسال پرسش دانشجو', protocol: 'HTTPS', flowType: 'data' },
    { id: 'e2', from: 'node-auth-guard', to: 'node-planning-agent', label: 'درخواست پالایش‌شده + متادیتای دانشجو', protocol: 'Internal gRPC', flowType: 'control' },
    { id: 'e3', from: 'node-planning-agent', to: 'node-rag-pipeline', label: 'استعلام استدلالی قوانین (زیرهدف)', protocol: 'Service Call', flowType: 'control' },
    { id: 'e4', from: 'node-rag-pipeline', to: 'node-bylaws-db', label: 'جستجوی هیبریدی و فیلتر دوره ورود', protocol: 'Vector Query', flowType: 'data' },
    { id: 'e5', from: 'node-planning-agent', to: 'node-golestan-db', label: 'استعلام سوابق و وضعیت مشروطی', protocol: 'Secure API Call', flowType: 'data' },
    { id: 'e6', from: 'node-planning-agent', to: 'node-model-gateway', label: 'درخواست استدلال / تولید نهایی', protocol: 'Standardized REST', flowType: 'control' },
    { id: 'e7', from: 'node-model-gateway', to: 'node-local-llm', label: 'ارسال به سرور محلی (داده محرمانه/پشتیبان)', protocol: 'vLLM HTTP Stream', flowType: 'data' },
    { id: 'e8', from: 'node-rag-pipeline', to: 'node-planning-agent', label: 'قطعات آیین‌نامه تاییدشده + ارجاعات', protocol: 'Observation Payload', flowType: 'feedback' },
    { id: 'e9', from: 'node-model-gateway', to: 'node-client', label: 'پاسخ نهایی مستند جریانی', protocol: 'SSE Token Stream', flowType: 'data' }
  ]
};
