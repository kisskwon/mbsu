import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// 키스권 스토어
const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: "AIzaSyCs4V88rHCCpXAhPV3SefY9zA7kAFktUOU",
  authDomain: "flutter-damda-gallery2.firebaseapp.com",
  projectId: "flutter-damda-gallery2",
  storageBucket: "flutter-damda-gallery2.appspot.com",
  messagingSenderId: "162221939537",
  appId: "1:162221939537:web:c562287111d83a3d34d170",
  measurementId: "G-NLZJM75QCF",
};

// firebaseConfig 정보로 firebase 시작
const kiss = initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
//const storage = getStorage();
const db = getFirestore(kiss);

// 일번남 스토어
const firebaseConfig2 = {
  apiKey: "AIzaSyC_PptLQDnSWEdSTUdeZWjhtp6HOgYdRno",
  authDomain: "netflix-crawling.firebaseapp.com",
  projectId: "netflix-crawling",
  storageBucket: "netflix-crawling.appspot.com",
  messagingSenderId: "355436684914",
  appId: "1:355436684914:web:2d27e1acdd38ff4e3984eb",
  measurementId: "G-ZK68F830TG"
};

const kbk = initializeApp(firebaseConfig2, "fuckingYSY");

// firebase의 firestore 인스턴스를 변수에 저장
//const storage = getStorage();
const db2 = getFirestore(kbk);


// 필요한 곳에서 사용할 수 있도록 내보내기
export { db, db2 };
