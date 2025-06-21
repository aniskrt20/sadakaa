
export interface Dhikr {
  id: number;
  text: string;
  translation?: string;
  count?: number;
  source?: string;
}

export interface DhikrCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  adhkar: Dhikr[];
}

export const dhikrCategories: DhikrCategory[] = [
  {
    id: "morning",
    name: "Morning Adhkar",
    nameAr: "أذكار الصباح",
    icon: "sun",
    color: "#F59E0B",
    adhkar: [
      {
        id: 1,
        text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
        count: 1,
        source: "Abu Dawud"
      },
      {
        id: 2,
        text: "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَكَلِمَةِ الْإِخْلَاصِ، وَدِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَمِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا، وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
        translation: "We have reached the morning upon the natural religion of Islam, the word of sincere devotion, the religion of our Prophet Muhammad, and the faith of our father Ibrahim. He was upright and a Muslim, and he was not from among those who associated others with Allah.",
        count: 1,
        source: "Ahmad"
      },
      {
        id: 3,
        text: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
        translation: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings be upon him) as my Prophet.",
        count: 3,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 4,
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        translation: "O Allah, I ask You for beneficial knowledge, lawful provision, and deeds that will be accepted.",
        count: 1,
        source: "Ibn Majah"
      },
      {
        id: 5,
        text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        translation: "O Allah, by Your leave we have reached the morning and by Your leave we will reach the evening, by Your leave we live and die, and to You is the resurrection.",
        count: 1,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 6,
        text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent.",
        count: 1,
        source: "Al-Bazzar, Tabarani"
      },
      {
        id: 7,
        text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ أَبَدًا",
        translation: "O Ever-Living One, O Self-Sustaining One, by Your mercy I seek assistance, rectify for me all of my affairs and do not leave me to myself, even for the blink of an eye.",
        count: 1,
        source: "Al-Bazzar"
      },
      {
        id: 8,
        text: "اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        translation: "O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide by Your covenant and promise as best I can, I seek refuge in You from the evil of which I have committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.",
        count: 1,
        source: "Bukhari"
      },
      {
        id: 9,
        text: "اللَّهُمَّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ",
        translation: "O Allah, Creator of the heavens and the earth, Knower of the unseen and the seen, Lord and Sovereign of all things, I bear witness that none has the right to be worshipped except You. I seek refuge in You from the evil of my soul and from the evil and shirk of the devil, and from committing wrong against my soul or bringing such upon another Muslim.",
        count: 1,
        source: "Tirmidhi"
      },
      {
        id: 10,
        text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، وَأَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
        translation: "We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and the evil of old age. My Lord, I seek refuge in You from the torment of the Fire and the torment of the grave.",
        count: 1,
        source: "Muslim"
      },
      {
        id: 11,
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، وَاحْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
        translation: "O Allah, I ask You for pardon and well-being in this life and the next. O Allah, I ask You for pardon and well-being in my religious and worldly affairs, and my family and my wealth. O Allah, veil my weaknesses and set at ease my dismay. O Allah, preserve me from in front of me and from behind me, and on my right, and on my left, and from above me. I seek refuge in Your greatness from being swallowed by the earth from beneath me.",
        count: 1,
        source: "Abu Dawud, Ibn Majah"
      },
      {
        id: 12,
        text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ",
        translation: "In the name of Allah with whose name nothing can cause harm on earth or in heaven, and He is the All-Hearing, the All-Knowing.",
        count: 3,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 13,
        text: "سُبْحَانَ اللهِ عَدَدَ خَلْقِهِ، سُبْحَانَ اللهِ رِضَا نَفْسِهِ، سُبْحَانَ اللهِ زِنَةَ عَرْشِهِ، سُبْحَانَ اللهِ مِدَادَ كَلِمَاتِهِ",
        translation: "Glory is to Allah by the number of His creation. Glory is to Allah by His pleasure. Glory is to Allah by the weight of His throne. Glory is to Allah by the ink of His words.",
        count: 3,
        source: "Muslim"
      },
      {
        id: 14,
        text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
        translation: "O Allah, grant my body health, O Allah, grant my hearing health, O Allah, grant my sight health. None has the right to be worshipped except You. O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. None has the right to be worshipped except You.",
        count: 3,
        source: "Abu Dawud"
      },
      {
        id: 15,
        text: "قُلْ هُوَ اللهُ أَحَدٌ * اللهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِن شَرِّ مَا خَلَقَ * وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ * مَلِكِ النَّاسِ * إِلَٰهِ النَّاسِ * مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ * الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ * مِنَ الْجِنَّةِ وَالنَّاسِ",
        translation: "Say: He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.\nSay: I seek refuge in the Lord of daybreak, From the evil of that which He created, And from the evil of darkness when it settles, And from the evil of the blowers in knots, And from the evil of an envier when he envies.\nSay: I seek refuge in the Lord of mankind, The Sovereign of mankind, The God of mankind, From the evil of the retreating whisperer - Who whispers [evil] into the breasts of mankind - From among the jinn and mankind.",
        count: 3,
        source: "Tirmidhi"
      },
      {
        id: 16,
        text: "حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        translation: "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.",
        count: 7,
        source: "Abu Dawud"
      },
      {
        id: 17,
        text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ، أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللهُ، وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
        translation: "O Allah, I have reached the morning and call upon You, Your bearers of Your throne, Your angels, and all of Your creation to witness that You are Allah, none has the right to be worshipped except You, alone, without partner and that Muhammad is Your Servant and Messenger.",
        count: 4,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 18,
        text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, He gives life and causes death and He is over all things omnipotent.",
        count: 10,
        source: "Ibn Hibban"
      },
      {
        id: 19,
        text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        translation: "Glory is to Allah and praise is to Him.",
        count: 100,
        source: "Muslim"
      },
      {
        id: 20,
        text: "أَسْتَغْفِرُ اللهَ",
        translation: "I seek forgiveness from Allah.",
        count: 100,
        source: "Ibn Abi Shaybah"
      },
      {
        id: 21,
        text: "سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَاللهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "Glory is to Allah, and praise is to Allah, and Allah is Most Great. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
        count: 100,
        source: "Tirmidhi"
      },
      {
        id: 22,
        text: "آيَةُ الْكُرْسِيِّ: اللهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        translation: "Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        count: 1,
        source: "Al-Hakim, Ibn Hibban"
      }
    ]
  },
  {
    id: "evening",
    name: "Evening Adhkar",
    nameAr: "أذكار المساء",
    icon: "moon",
    color: "#8B5CF6",
    adhkar: [
      {
        id: 1,
        text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "We have reached the evening and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
        count: 1,
        source: "Abu Dawud"
      },
      {
        id: 2,
        text: "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَكَلِمَةِ الْإِخْلَاصِ، وَدِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَمِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا، وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
        translation: "We have reached the evening upon the natural religion of Islam, the word of sincere devotion, the religion of our Prophet Muhammad ﷺ, and the faith of our father Ibrahim. He was upright and a Muslim, and he was not from among those who associated others with Allah.",
        count: 1,
        source: "Ahmad"
      },
      {
        id: 3,
        text: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
        translation: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings be upon him) as my Prophet.",
        count: 3,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 4,
        text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
        translation: "O Allah, by Your leave we have reached the evening and by Your leave we will reach the morning, by Your leave we live and die, and to You is the final return.",
        count: 1,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 5,
        text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent.",
        count: 1,
        source: "Al-Bazzar, Tabarani"
      },
      {
        id: 6,
        text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ أَبَدًا",
        translation: "O Ever-Living One, O Self-Sustaining One, by Your mercy I seek assistance, rectify for me all of my affairs and do not leave me to myself, even for the blink of an eye.",
        count: 1,
        source: "Al-Bazzar"
      },
      {
        id: 7,
        text: "اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        translation: "O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide by Your covenant and promise as best I can, I seek refuge in You from the evil of which I have committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.",
        count: 1,
        source: "Bukhari"
      },
      {
        id: 8,
        text: "اللَّهُمَّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا، أَوْ أَجُرُّهُ إِلَى مُسْلِمٍ",
        translation: "O Allah, Creator of the heavens and the earth, Knower of the unseen and the seen, Lord and Sovereign of all things, I bear witness that none has the right to be worshipped except You. I seek refuge in You from the evil of my soul and from the evil and shirk of the devil, and from committing wrong against my soul or bringing such upon another Muslim.",
        count: 1,
        source: "Tirmidhi"
      },
      {
        id: 9,
        text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ هَذِهِ اللَّيْلَةِ، وَخَيْرِ مَا بَعْدَهَا، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، وَأَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
        translation: "We have reached the evening and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner. O Allah, I ask You for the good of this night and the good of what follows it. O Allah, I seek refuge in You from the evil of this night and from the evil of what follows it. O Allah, I seek refuge in You from laziness and the evil of old age. O Allah, I seek refuge in You from the torment of the Fire and the torment of the grave.",
        count: 1,
        source: "Muslim"
      },
      {
        id: 10,
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، وَاحْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
        translation: "O Allah, I ask You for pardon and well-being in this life and the next. O Allah, I ask You for pardon and well-being in my religious and worldly affairs, and my family and my wealth. O Allah, veil my weaknesses and set at ease my dismay. O Allah, preserve me from in front of me and from behind me, and on my right, and on my left, and from above me. I seek refuge in Your greatness from being swallowed by the earth from beneath me.",
        count: 1,
        source: "Abu Dawud, Ibn Majah"
      },
      {
        id: 11,
        text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ",
        translation: "In the name of Allah with whose name nothing can cause harm on earth or in heaven, and He is the All-Hearing, the All-Knowing.",
        count: 3,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 12,
        text: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
        count: 3,
        source: "Muslim"
      },
      {
        id: 13,
        text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
        translation: "O Allah, grant my body health, O Allah, grant my hearing health, O Allah, grant my sight health. None has the right to be worshipped except You. O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. None has the right to be worshipped except You.",
        count: 3,
        source: "Abu Dawud"
      },
      {
        id: 14,
        text: "قُلْ هُوَ اللهُ أَحَدٌ * اللهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِن شَرِّ مَا خَلَقَ * وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ * مَلِكِ النَّاسِ * إِلَٰهِ النَّاسِ * مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ * الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ * مِنَ الْجِنَّةِ وَالنَّاسِ",
        translation: "Say: He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.\nSay: I seek refuge in the Lord of daybreak, From the evil of that which He created, And from the evil of darkness when it settles, And from the evil of the blowers in knots, And from the evil of an envier when he envies.\nSay: I seek refuge in the Lord of mankind, The Sovereign of mankind, The God of mankind, From the evil of the retreating whisperer - Who whispers [evil] into the breasts of mankind - From among the jinn and mankind.",
        count: 3,
        source: "Tirmidhi"
      },
      {
        id: 15,
        text: "حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        translation: "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.",
        count: 7,
        source: "Abu Dawud"
      },
      {
        id: 16,
        text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ، وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
        translation: "O Allah, I have reached the evening and call upon You, Your bearers of Your throne, Your angels, and all of Your creation to witness that You are Allah, none has the right to be worshipped except You, alone, without partner and that Muhammad is Your Servant and Messenger.",
        count: 4,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 17,
        text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, He gives life and causes death and He is over all things omnipotent.",
        count: 10,
        source: "Ibn Hibban"
      },
      {
        id: 18,
        text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        translation: "Glory is to Allah and praise is to Him.",
        count: 100,
        source: "Muslim"
      },
      {
        id: 19,
        text: "أَسْتَغْفِرُ اللهَ",
        translation: "I seek forgiveness from Allah.",
        count: 100,
        source: "Ibn Abi Shaybah"
      },
      {
        id: 20,
        text: "سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَاللهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "Glory is to Allah, and praise is to Allah, and Allah is Most Great. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
        count: 100,
        source: "Tirmidhi"
      },
      {
        id: 21,
        text: "آيَةُ الْكُرْسِيِّ: اللهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        translation: "Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        count: 1,
        source: "Al-Hakim, Ibn Hibban"
      }
    ]
  },
  {
    id: "after-prayer",
    name: "After Prayer Adhkar",
    nameAr: "أذكار بعد الصلاة",
    icon: "pray",
    color: "#10B981",
    adhkar: [
      {
        id: 1,
        text: "أَسْـتَغْفِرُ الله، أَسْـتَغْفِرُ الله، أَسْـتَغْفِرُ الله",
        translation: "I seek forgiveness from Allah, I seek forgiveness from Allah, I seek forgiveness from Allah.",
        count: 1,
        source: "Muslim"
      },
      {
        id: 2,
        text: "اللّهُـمَّ أَنْـتَ السَّلامُ ، وَمِـنْكَ السَّلام ، تَبارَكْتَ يا ذا الجَـلالِ وَالإِكْـرام",
        translation: "O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.",
        count: 1,
        source: "Muslim"
      },
      {
        id: 3,
        text: "لا إلهَ إلاّ اللّهُ وحدَهُ لا شريكَ لهُ، لهُ المُـلْكُ ولهُ الحَمْد، وهوَ على كلّ شَيءٍ قَدير، اللّهُـمَّ لا مانِعَ لِما أَعْطَـيْت، وَلا مُعْطِـيَ لِما مَنَـعْت، وَلا يَنْفَـعُ ذا الجَـدِّ مِنْـكَ الجَـد",
        translation: "None has the right to be worshipped but Allah alone, He has no partner, His is the dominion and His is the praise and He is able to do all things. O Allah, none can withhold what You grant, and none can grant what You withhold; and the might of the mighty person cannot benefit him against You.",
        count: 1,
        source: "Bukhari, Muslim"
      },
      {
        id: 4,
        text: "لا إلهَ إلاّ اللّه, وحدَهُ لا شريكَ لهُ، لهُ الملكُ ولهُ الحَمد، وهوَ على كلّ شيءٍ قدير، لا حَـوْلَ وَلا قـوَّةَ إِلاّ بِاللهِ، لا إلهَ إلاّ اللّـه، وَلا نَعْـبُـدُ إِلاّ إيّـاه, لَهُ النِّعْـمَةُ وَلَهُ الفَضْل وَلَهُ الثَّـناءُ الحَـسَن، لا إلهَ إلاّ اللّهُ مخْلِصـينَ لَـهُ الدِّينَ وَلَوْ كَـرِهَ الكـافِرون",
        translation: "None has the right to be worshipped but Allah alone, He has no partner, His is the dominion and His is the praise and He is able to do all things. There is no power and no might except with Allah. None has the right to be worshipped but Allah and we worship none but Him. For Him is all favor, grace, and glorious praise. None has the right to be worshipped but Allah and we are sincere in faith and devotion to Him although the disbelievers detest it.",
        count: 1,
        source: "Muslim"
      },
      {
        id: 5,
        text: "سُـبْحانَ اللهِ، والحَمْـدُ لله ، واللهُ أكْـبَر",
        translation: "Glory is to Allah, and praise is to Allah, and Allah is the Greatest.",
        count: 33,
        source: "Muslim"
      },
      {
        id: 6,
        text: "لا إلهَ إلاّ اللّهُ وَحْـدَهُ لا شريكَ لهُ، لهُ الملكُ ولهُ الحَمْد، وهُوَ على كُلّ شَيءٍ قَـدير",
        translation: "None has the right to be worshipped but Allah alone, He has no partner, His is the dominion and His is the praise and He is able to do all things.",
        count: 1,
        source: "Muslim"
      },
      {
        id: 7,
        text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.\nبِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.\nبِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.\" In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of daybreak From the evil of that which He created And from the evil of darkness when it settles And from the evil of the blowers in knots And from the evil of an envier when he envies.\" In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of mankind, The Sovereign of mankind, The God of mankind, From the evil of the retreating whisperer - Who whispers [evil] into the breasts of mankind - From among the jinn and mankind.\"",
        count: 3,
        source: "Abu Dawud, Tirmidhi, Nasai"
      },
      {
        id: 8,
        text: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        translation: "I seek refuge with Allah from Satan, the rejected. Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        count: 1,
        source: "Nasai"
      },
      {
        id: 9,
        text: "لا إلهَ إلاّ اللّهُ وحْـدَهُ لا شريكَ لهُ، لهُ المُلكُ ولهُ الحَمْد، يُحيـي وَيُمـيتُ وهُوَ على كُلّ شيءٍ قدير",
        translation: "None has the right to be worshipped but Allah alone, He has no partner, His is the dominion and His is the praise, He gives life and causes death and He is able to do all things.",
        count: 10,
        source: "Tirmidhi"
      },
      {
        id: 10,
        text: "اللّهُـمَّ إِنِّـي أَسْأَلُـكَ عِلْمـاً نافِعـاً وَرِزْقـاً طَيِّـباً ، وَعَمَـلاً مُتَقَـبَّلاً",
        translation: "O Allah, I ask You for beneficial knowledge, lawful provision, and deeds that will be accepted.",
        count: 1,
        source: "Ibn Majah"
      },
      {
        id: 11,
        text: "اللَّهُمَّ أَجِرْنِي مِنْ النَّار",
        translation: "O Allah, save me from the Fire.",
        count: 7,
        source: "Abu Dawud, Ibn Majah"
      },
      {
        id: 12,
        text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        translation: "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
        count: 1,
        source: "Abu Dawud, Nasai"
      }
    ]
  },
  {
    id: "sleep",
    name: "Before Sleep Adhkar",
    nameAr: "أذكار النوم",
    icon: "bed",
    color: "#8B5CF6",
    adhkar: [
      {
        id: 1,
        text: "بِاسْمِكَ رَبِّـي وَضَعْـتُ جَنْـبي ، وَبِكَ أَرْفَعُـه، فَإِن أَمْسَـكْتَ نَفْسـي فارْحَـمْها ، وَإِنْ أَرْسَلْتَـها فاحْفَظْـها بِمـا تَحْفَـظُ بِه عِبـادَكَ الصّـالِحـين",
        translation: "In Your name, my Lord, I lie down, and in Your name I rise. If You should take my soul, then have mercy upon it, and if You should return my soul, then protect it with that which You protect Your righteous servants.",
        count: 1,
        source: "Bukhari"
      },
      {
        id: 2,
        text: "اللّهُـمَّ إِنَّـكَ خَلَـقْتَ نَفْسـي وَأَنْـتَ تَوَفّـاهـا لَكَ ممَـاتـها وَمَحْـياها ، إِنْ أَحْيَيْـتَها فاحْفَظْـها ، وَإِنْ أَمَتَّـها فَاغْفِـرْ لَـها . اللّهُـمَّ إِنَّـي أَسْـأَلُـكَ العـافِـيَة",
        translation: "O Allah, You have created my soul and You take it back. Unto You is its death and its life. If You give it life then protect it, and if You cause it to die then forgive it. O Allah, I ask You for wellbeing.",
        count: 1,
        source: "Muslim"
      },
      {
        id: 3,
        text: "اللّهُـمَّ قِنـي عَذابَـكَ يَـوْمَ تَبْـعَثُ عِبـادَك",
        translation: "O Allah, save me from Your punishment on the Day when You resurrect Your servants.",
        count: 3,
        source: "Abu Dawud"
      },
      {
        id: 4,
        text: "بِاسْـمِكَ اللّهُـمَّ أَمـوتُ وَأَحْـيا",
        translation: "In Your name, O Allah, I die and I live.",
        count: 1,
        source: "Bukhari, Muslim"
      },
      {
        id: 5,
        text: "الـحَمْدُ للهِ الَّذي أَطْـعَمَنا وَسَقـانا، وَكَفـانا، وَآوانا، فَكَـمْ مِمَّـنْ لا كـافِيَ لَـهُ وَلا مُـؤْوي",
        translation: "Praise is to Allah Who has fed us and given us drink, and Who is sufficient for us and has sheltered us, for how many have none to suffice them or shelter them.",
        count: 1,
        source: "Muslim"
      },
      {
        id: 6,
        text: "اللّهُـمَّ عالِـمَ الغَـيبِ وَالشّـهادةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كُـلِّ شَـيءٍ وَمَليـكَه، أَشْهـدُ أَنْ لا إِلـهَ إِلاّ أَنْت، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي، وَمِن شَـرِّ الشَّيْـطانِ وَشِـرْكِه، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِم",
        translation: "O Allah, Knower of the unseen and the evident, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that none has the right to be worshipped except You. I seek refuge in You from the evil of my soul and from the evil and shirk of the devil, and from committing wrong against my soul or bringing such upon another Muslim.",
        count: 1,
        source: "Abu Dawud, Tirmidhi"
      },
      {
        id: 7,
        text: "اللّهُـمَّ أَسْـلَمْتُ نَفْـسي إِلَـيْكَ، وَفَوَّضْـتُ أَمْـري إِلَـيْكَ، وَوَجَّـهْتُ وَجْـهي إِلَـيْكَ، وَأَلْـجَـاْتُ ظَهـري إِلَـيْكَ، رَغْبَـةً وَرَهْـبَةً إِلَـيْكَ، لا مَلْجَـأَ وَلا مَنْـجـا مِنْـكَ إِلاّ إِلَـيْكَ، آمَنْـتُ بِكِتـابِكَ الّـذي أَنْزَلْـتَ وَبِنَبِـيِّـكَ الّـذي أَرْسَلْـت",
        translation: "O Allah, I submit myself to You, entrust my affairs to You, turn my face to You, and lay myself down depending upon You, hoping in You and fearing You. There is no refuge and no escape except to You. I believe in Your Book which You have revealed and in Your Prophet whom You have sent.",
        count: 1,
        source: "Bukhari, Muslim"
      },
      {
        id: 8,
        text: "سُبْحَانَ اللَّهِ",
        translation: "Glory is to Allah.",
        count: 33,
        source: "Bukhari, Muslim"
      },
      {
        id: 9,
        text: "الْحَمْدُ لِلَّهِ",
        translation: "Praise is to Allah.",
        count: 33,
        source: "Bukhari, Muslim"
      },
      {
        id: 10,
        text: "اللَّهُ أَكْبَرُ",
        translation: "Allah is the Greatest.",
        count: 34,
        source: "Bukhari, Muslim"
      },
      {
        id: 11,
        text: "يجمع كفيه ثم ينفث فيهما والقراءة فيهما‏:‏ ‏{‏قل هو الله أحد‏}‏ و‏{‏قل أعوذ برب الفلق‏}‏ و‏{‏قل أعوذ برب الناس‏}‏ ومسح ما استطاع من الجسد يبدأ بهما على رأسه ووجه وما أقبل من جسده",
        translation: "Cup your hands together, blow into them, and recite Surat Al-Ikhlas, Al-Falaq, and An-Nas. Then wipe as much of your body as you can, starting with your head and face, and the front of your body. Do this three times.",
        count: 3,
        source: "Bukhari"
      },
      {
        id: 12,
        text: "سورة البقرة: أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nآمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        translation: "The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], \"We make no distinction between any of His messengers.\" And they say, \"We hear and we obey. We seek Your forgiveness, our Lord, and to You is the final destination.\" Allah does not charge a soul except with that within its capacity. It will have the consequence of what good it has gained, and it will bear the consequence of what evil it has earned. \"Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.\"",
        count: 1,
        source: "Bukhari, Muslim"
      },
      {
        id: 13,
        text: "آية الكرسى: أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        translation: "I seek refuge with Allah from Satan, the rejected. Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        count: 1,
        source: "Bukhari"
      },
      {
        id: 14,
        text: "اللهم رب السموات السبع وما أظلت، ورب الأرضين وما أقلت، ورب الشياطين وما أضلت، كن لي جارا من خلقك كلهم جميعا أن يفرط علي أحد منهم أو أن يبغي علي، عز جارك، وجل ثناؤك ولا إله غيرك، ولا إله إلا أنت",
        translation: "O Allah, Lord of the seven heavens and all they overshadow, Lord of the earths and all they uphold, Lord of the devils and all whom they lead astray, be my protector from the evil of all Your creation lest any of them should hasten to harm me or transgress against me. Mighty is the one who seeks Your protection and glorious are Your praises. There is no god other than You, there is no god except You.",
        count: 1,
        source: "Bukhari in Al-Adab Al-Mufrad"
      },
      {
        id: 15,
        text: "أعوذ بكلمات الله التامة من غضبه وشر عباده، ومن همزات الشياطين وأن يحضرون",
        translation: "I seek refuge in the perfect words of Allah from His anger and from the evil of His servants, and from the evil suggestions of the devils and from their presence.",
        count: 1,
        source: "Abu Dawud, Tirmidhi"
      }
    ]
  }
];
