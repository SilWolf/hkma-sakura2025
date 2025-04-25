const PLAYERS = [
  {
    id: "player1",
    name: {
      display: "校花",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/4.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/4.png",
      },
    },
    stat: {
      atk: 3,
      def: 3,
      spd: 3,
      luk: 3,
    },
    metadatas: [
      { label: "擅長的戰術", content: "演技" },
      { label: "打牌時的小動作", content: "插花" },
      { label: "身上最引以為傲嘅地方", content: "直覺" },
      { label: "最愛的穿搭風格", content: "亂著" },
      { label: "擇偶條件", content: "識打牌" },
      { label: "最討厭的人類", content: "我自己" },
      { label: "你最喜愛做的事", content: "打波" },
      {
        label: "想同觀眾講的說話",
        content: "係其他人立直嘅時候，記得一句：\n心中有佛，怕佢碌柒",
      },
    ],
    description:
      "充滿活力的運動系麻雀玩家！熱愛各類運動，相信運動家精神能帶來更好的牌運。習慣被朋友們強迫喝酒，但在牌桌上永遠保持清醒頭腦。座右銘「心中有佛，怕佢碌柒」展現出獨特的校花哲學。",
  },
  {
    id: "player2",
    name: {
      display: "校園神犬",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/6.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/6.png",
      },
    },
    stat: {
      atk: 4,
      def: 2,
      spd: 1,
      luk: 4,
    },
    metadatas: [
      { label: "擅長的戰術", content: "睇心情打" },
      { label: "打牌時的小動作", content: "表情包" },
      { label: "你最喜愛做的事", content: "訓覺" },
      { label: "想同觀眾講的說話", content: "同Iris一齊炸花花" },
    ],
    description:
      "充滿朝氣的半年級新手！擁有日語N3資格，經常飲津路。雖然是初學者，但擁有超強學習能力，期待未來更多精彩表現。將ENFP的瘋氣與麻雀技術完美結合的新星選手。",
  },
  {
    id: "player3",
    name: {
      display: "Louis",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/5.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/5.png",
      },
    },
    stat: {
      atk: 4,
      def: 2,
      spd: 4,
      luk: 3,
    },
    metadatas: [
      { label: "擅長的戰術", content: "科學麻雀" },
      { label: "打牌時的小動作", content: "轉最右張牌" },
      { label: "身上最引以為傲嘅地方", content: "風水實力" },
      { label: "最愛的穿搭風格", content: "簡單/OL" },
      { label: "擇偶條件", content: "至少識打牌" },
      { label: "最討厭的人類", content: "無" },
      { label: "你最喜愛做的事", content: "打牌" },
      { label: "想同觀眾講的說話", content: "希望大家多喜愛競技麻雀" },
    ],
    description:
      "實力與榮譽兼具的頂尖選手！以天鳳5段的實力加上2024年香港立直麻雀團體聯賽冠軍的成就，證明了自己的實力。熱愛高度數美酒，相信麻將不僅是運氣，更重要的是以理論和推理作為基礎。擅長分析局勢，制定最佳策略。",
  },
  {
    id: "player4",
    name: {
      display: "Kelly",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/10.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/10.png",
      },
    },
    stat: {
      atk: 3,
      def: 2,
      spd: 2,
      luk: 2,
    },
    metadatas: [
      { label: "擅長的戰術", content: "立直" },
      { label: "打牌時的小動作", content: "轉牌" },
      { label: "身上最引以為傲嘅地方", content: "美甲" },
      { label: "最愛的穿搭風格", content: "沒有" },
      { label: "最討厭的人類", content: "自私自利的rule breaker" },
      { label: "你最喜愛做的事", content: "窩在被窩" },
      { label: "想同觀眾講的說話", content: "輕力啲鬧" },
    ],
    description:
      "喜歡日麻的數學白痴\n曾經靠運氣打到天鳳5段，但係喺報點等同數學有關嘅範疇依然係好有困難。喜歡四麻，更喜歡三麻。對精緻嘅美甲引以為傲。得閒嘅話會寫麻經，希望大家睇得開心！",
  },
  {
    id: "player5",
    name: {
      display: "Cry桃",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/1.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/1.png",
      },
    },
    stat: {
      atk: 3,
      def: 4,
      spd: 3,
      luk: 3,
    },
    metadatas: [
      { label: "擅長的戰術", content: "穩守突擊，觀察對手微表情" },
      { label: "打牌時的小動作", content: "裏目時會不自覺地眨眼" },
      { label: "身上最引以為傲嘅地方", content: "有啲小聰明" },
      { label: "擇偶條件", content: "夠charm，心地善良" },
      { label: "最討厭的人類", content: "心地差" },
      {
        label: "想同觀眾講的說話",
        content:
          "希望大家可以多多支持同埋令大家愛上麻雀，期望有一日可以同大家切磋",
      },
    ],
    description:
      "於香港立直麻雀團體聯賽創下連續4個半莊無放銃的驚人記錄！作為一位技術型選手，擅長穩健的打法。對燒酒情有獨鍾，對局中喜歡吃零食，飲牛奶。",
  },
  {
    id: "player6",
    name: {
      display: "Krystal",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/2.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/2.png",
      },
    },
    stat: {
      atk: 3,
      def: 2,
      spd: 1,
      luk: 3,
    },
    metadatas: [
      { label: "擅長的戰術", content: "暴力和直覺" },
      { label: "打牌時的小動作", content: "表情包" },
      { label: "最愛的穿搭風格", content: "Any wear" },
      { label: "擇偶條件", content: "邊個食到糊就最鍾意邊個，一定要食過役滿" },
      { label: "最討厭的人類", content: "未食過役滿嘅人" },
      { label: "你最喜愛做的事", content: "訓覺" },
      { label: "想同觀眾講的說話", content: "一齊炸花花！" },
    ],
    description:
      "擁有2-3年麻雀經驗的實力派選手！在香港立直麻雀團體聯賽中創下5連Top的亮眼戰績，更一舉擊飛三家展現實力。以果斷扭的打法著稱，人稱雀后，在牌桌上展現出獨特魅力。",
  },
  {
    id: "player7",
    name: {
      display: "Eris",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/8.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/8.png",
      },
    },
    stat: {
      atk: 4,
      def: 3,
      spd: 3,
      luk: 2,
    },
    metadatas: [
      { label: "擅長的戰術", content: "三暗追立" },
      { label: "打牌時的小動作", content: "甩牌" },
      { label: "身上最引以為傲嘅地方", content: "手應該係最靚" },
      { label: "最愛的穿搭風格", content: "淑女，休閒" },
      { label: "擇偶條件", content: "幽默，聰明" },
      { label: "最討厭的人類", content: "得把口" },
      {
        label: "你最喜愛做的事",
        content: "睇書，打牌，追劇（日本醫療劇/推理劇），普拉提",
      },
      {
        label: "想同觀眾講的說話",
        content: "希望係樱花盃發揮出我真正嘅水準！希望大家多多支持",
      },
    ],
    description:
      "香港競技麻雀界的實力派選手！4年的豐富經驗，培養出全面的麻雀技術，曾榮獲多個日麻比賽冠軍。熱愛閱讀、追劇，並保持著規律的普拉提運動。文武雙全的形象，在牌桌上展現出強大實力。",
  },
  {
    id: "player8",
    name: {
      display: "Evelyn",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/3.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/3.png",
      },
    },
    stat: {
      atk: 2,
      def: 2,
      spd: 3,
      luk: 4,
    },
    metadatas: [
      { label: "身上最引以為傲嘅地方", content: "英文幾好" },
      { label: "最愛的穿搭風格", content: "unisex" },
      { label: "擇偶條件", content: "無所謂" },
      { label: "最討厭的人類", content: "蠢人" },
      { label: "你最喜愛做的事", content: "瞓" },
      { label: "想同觀眾講的說話", content: "新手！新手！新手！" },
    ],
    description:
      "雖然只有半年麻雀經驗，但展現出驚人的天賦！特別喜歡荔枝口味的各種飲品，每次對局都展現出超強的集中力。期待在麻雀世界繼續成長，創造更多精彩戰績。",
  },
  {
    id: "player9",
    name: {
      display: "Momo",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/9.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/9.png",
      },
    },
    stat: {
      atk: 3,
      def: 2,
      spd: 3,
      luk: 2,
    },
    metadatas: [
      { label: "打牌時的小動作", content: "轉牌" },
      { label: "身上最引以為傲嘅地方", content: "一個有趣嘅靈魂" },

      { label: "擇偶條件", content: "一個有趣嘅靈魂" },
      { label: "最討厭的人類", content: "一個有趣嘅靈魂" },
      { label: "你最喜愛做的事", content: "Sleep" },
      { label: "想同觀眾講的說話", content: "Oiiaoiia" },
    ],
    description:
      "文學與麻雀的完美結合！一年的麻雀經驗，卻對《1984》等經典文學作品有著深刻理解。喜歡日本清酒，對有趣嘅靈魂又愛又恨，總是帶著「oiiaoiia」的歡樂口頭禪。文青氣質與麻雀技術的獨特組合。",
  },
  {
    id: "player10",
    name: {
      display: "大炮喵喵",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/11.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/11.png",
      },
    },
    stat: {
      atk: 5,
      def: 4,
      spd: 4,
      luk: 5,
    },
    metadatas: [
      { label: "擅長的戰術", content: "Er?dora?" },
      { label: "打牌時的小動作", content: "轉牌" },
      { label: "身上最引以為傲嘅地方", content: "對眼 胸" },
      { label: "最愛的穿搭風格", content: "背心短褲" },
      { label: "擇偶條件", content: "我未婚夫～" },
      { label: "最討厭的人類", content: "惹我既人都討厭～" },
      { label: "你最喜愛做的事", content: "去旅行 食 瞓 打牌 唱歌" },
      { label: "想同觀眾講的說話", content: "同神犬一齊炸花花" },
    ],
    description:
      "擁有20年深厚麻雀經驗的老手！最輝煌的戰績是達成九蓮寶燈立直12個dora的稀有役滿。以專業炸校花的技術聞名，被譽為「運氣與實力兼具的女雀士」。牌運驚人，總能在關鍵時刻中出寶貴的dora。",
  },
  {
    id: "player11",
    name: {
      display: "Hazel",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/13.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/13.png",
      },
    },
    stat: {
      atk: 2,
      def: 3,
      spd: 2,
      luk: 3,
    },
    metadatas: [
      { label: "身上最引以為傲嘅地方", content: "同埋心" },
      { label: "最愛的穿搭風格", content: "韓風" },

      { label: "最討厭的人類", content: "無禮貌嘅人" },
      { label: "你最喜愛做的事", content: "聽歌" },
      { label: "想同觀眾講的說話", content: "新手但會努力學" },
    ],
    description:
      "半年麻雀經驗的音樂愛好者！熱愛聽歌放鬆心情。作為麻雀新手，贏過$100是最難忘的戰績。以輕鬆愉快的心態學習麻雀，享受每一局比賽的樂趣。",
  },
  {
    id: "player12",
    name: {
      display: "芙蓮",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/12.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/12.png",
      },
    },
    stat: {
      atk: 2,
      def: 1,
      spd: 3,
      luk: 4,
    },
    metadatas: [
      { label: "打牌時的小動作", content: "不出聲" },
      { label: "身上最引以為傲嘅地方", content: "瞓覺既頻率" },

      { label: "擇偶條件", content: "情緒穩定" },
      { label: "最討厭的人類", content: "多廢話" },
      { label: "你最喜愛做的事", content: "睡覺" },
      { label: "想同觀眾講的說話", content: "唔好空肚食早餐" },
    ],
    description:
      "充滿陽光般笑容的一年級新手！以樂觀積極的態度面對每一局比賽。最愛睡覺和Asahi，有趣的座右銘「唔好空肚食早餐」。期待在麻雀路上繼續成長！",
  },
  {
    id: "player13",
    name: {
      display: "Cabo",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/14.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/14.png",
      },
    },
    stat: {
      atk: 3,
      def: 2,
      spd: 2,
      luk: 5,
    },
    metadatas: [
      { label: "擅長的戰術", content: "出口術" },
      { label: "打牌時的小動作", content: "拎到隻牌有咁高得咁高" },
      { label: "身上最引以為傲嘅地方", content: "Eyes" },
      { label: "最愛的穿搭風格", content: "吊帶小背心" },
      { label: "擇偶條件", content: "高" },
      { label: "最討厭的人類", content: "自大蠹而不自知" },
      { label: "你最喜愛做的事", content: "睡覺撚貓打冬冬" },
      {
        label: "想同觀眾講的說話",
        content: "我係Cabo，IG:cabobo，請大家多多follow，第一次玩日麻請多指教",
      },
    ],
    description:
      "5年麻雀經驗的資深玩家！創下連續打了兩天兩夜的驚人紀錄，展現出超強體力。身為貓奴的她，特別鍾愛少爺啤酒，在牌桌上總是充滿活力。結合了貓咪的敏銳直覺和啤酒的爽朗個性。非常樂於認識新朋友，歡迎大家加佢 IG！！！",
  },
  {
    id: "player14",
    name: {
      display: "Hennessy",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/15.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/15.png",
      },
    },
    stat: {
      atk: 3,
      def: 4,
      spd: 2,
      luk: 1,
    },
    metadatas: [
      { label: "擅長的戰術", content: "絕對防守" },
      { label: "打牌時的小動作", content: "呆" },
      { label: "身上最引以為傲嘅地方", content: "一發上統" },
      { label: "最愛的穿搭風格", content: "卡其色 休閑裝" },
      { label: "擇偶條件", content: "高富帥" },
      { label: "最討厭的人類", content: "人類" },

      {
        label: "想同觀眾講的說話",
        content: "我唔識打牌架～\n教我打牌啦～\n係愛呀，哈利",
      },
    ],
    description:
      "麻雀經歷2年的防守型選手，擅長在危險局面中找出安全棄牌。作為一名防守藝術家，最引以為傲的戰績是成功阻止對手的役滿。善於觀察他人打法，不斷學習進步。期待在牌桌上與各位交流技術！",
  },
  {
    id: "player15",
    name: {
      display: "Ser-Ser",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/16.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/16.png",
      },
    },
    stat: {
      atk: 5,
      def: 1,
      spd: 1,
      luk: 5,
    },
    metadatas: [
      { label: "擅長的戰術", content: "9打" },
      { label: "打牌時的小動作", content: "打乞嗤，玩手趾" },
      { label: "身上最引以為傲嘅地方", content: "腳趾" },
      { label: "最愛的穿搭風格", content: "9wear" },
      { label: "擇偶條件", content: "男人" },
      { label: "最討厭的人類", content: "討厭我的人" },
      { label: "你最喜愛做的事", content: "做我愛做的事" },
    ],
    description:
      "擁有10年港式麻雀經驗的狂熱玩家！創下單日24小時不間斷打麻將的驚人紀錄。秉持著做自己喜歡事情的信念，在麻雀世界追求極致。豐富的經驗與持久的熱情造就了真正的麻雀達人。",
  },
  {
    id: "player16",
    name: {
      display: "YOKI",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/7.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/7.png",
      },
    },
    stat: {
      atk: 3,
      def: 3,
      spd: 4,
      luk: 3,
    },
    metadatas: [
      { label: "擅長的戰術", content: "叮5食8" },
      { label: "打牌時的小動作", content: "摸下手鏈" },
      { label: "身上最引以為傲嘅地方", content: "食吾肥體質" },
      { label: "最愛的穿搭風格", content: "淺色系，短裙" },
      { label: "擇偶條件", content: "專一，可愛，溫柔體貼" },
      { label: "最討厭的人類", content: "要我重覆講幾次先知/明既人：蠢人/煩" },
      { label: "你最喜愛做的事", content: "睇海，影相，睇小說" },
    ],
    description:
      "13年麻雀資歷的資深玩家！不僅是麻雀高手，更是一位熱愛生活的文青。閒暇時喜歡到海邊拍照，捕捉生活中的美好瞬間。擅長閱讀各類小說，特別推薦《被討厭的勇氣》這本啟發人心的作品。以細膩的心思待人處世，在牌桌上也展現獨特魅力。",
  },
];

export default PLAYERS;

export type SakuraPlayer = (typeof PLAYERS)[number];

export const PLAYER_TYPE_DATA = {
  hklplayer: {
    bgColor: "#F400E0",
    bgColorLight: "#fadef8",
    color: "#FFFFFF",
    display: "HKL Player",
  },
  challenger: {
    bgColor: "#9078B5",
    bgColorLight: "#e7d9fc",
    color: "#FFFFFF",
    display: "Challenger",
  },
} as const;
