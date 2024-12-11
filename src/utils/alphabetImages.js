// Importing alphabets images
import a from '../assets/img/alphabets/letter-a.png';
import b from '../assets/img/alphabets/letter-b.png';
import c from '../assets/img/alphabets/letter-c.png';
import d from '../assets/img/alphabets/letter-d.png';
import e from '../assets/img/alphabets/letter-e.png';
import f from '../assets/img/alphabets/letter-f.png';
import g from '../assets/img/alphabets/letter-g.png';
import h from '../assets/img/alphabets/letter-h.png';
import i from '../assets/img/alphabets/letter-i.png';
import j from '../assets/img/alphabets/letter-j.png';
import k from '../assets/img/alphabets/letter-k.png';
import l from '../assets/img/alphabets/letter-l.png';
import m from '../assets/img/alphabets/letter-m.png';
import n from '../assets/img/alphabets/letter-n.png';
import o from '../assets/img/alphabets/letter-o.png';
import p from '../assets/img/alphabets/letter-p.png';
import q from '../assets/img/alphabets/letter-q.png';
import r from '../assets/img/alphabets/letter-r.png';
import s from '../assets/img/alphabets/letter-s.png';
import t from '../assets/img/alphabets/letter-t.png';
import u from '../assets/img/alphabets/letter-u.png';
import v from '../assets/img/alphabets/letter-v.png';
import w from '../assets/img/alphabets/letter-w.png';
import x from '../assets/img/alphabets/letter-x.png';
import y from '../assets/img/alphabets/letter-y.png';
import z from '../assets/img/alphabets/letter-z.png';

// Importing Numbers -
import one from '../assets/img/numbers/number-1.png';
import two from '../assets/img/numbers/number-2.png';
import three from '../assets/img/numbers/number-3.png';
import four from '../assets/img/numbers/number-4.png';
import five from '../assets/img/numbers/number-5.png';
import six from '../assets/img/numbers/number-6.png';
import seven from '../assets/img/numbers/number-7.png';
import eight from '../assets/img/numbers/number-8.png';
import nine from '../assets/img/numbers/number-9.png';

import empty from '../assets/img/numbers/empty.png';

export const alphabetImages = [
   { letter: 'A', image: a },
   { letter: 'B', image: b },
   { letter: 'C', image: c },
   { letter: 'D', image: d },
   { letter: 'E', image: e },
   { letter: 'F', image: f },
   { letter: 'G', image: g },
   { letter: 'H', image: h },
   { letter: 'I', image: i },
   { letter: 'J', image: j },
   { letter: 'K', image: k },
   { letter: 'L', image: l },
   { letter: 'M', image: m },
   { letter: 'N', image: n },
   { letter: 'O', image: o },
   { letter: 'P', image: p },
   { letter: 'Q', image: q },
   { letter: 'R', image: r },
   { letter: 'S', image: s },
   { letter: 'T', image: t },
   { letter: 'U', image: u },
   { letter: 'V', image: v },
   { letter: 'W', image: w },
   { letter: 'X', image: x },
   { letter: 'Y', image: y },
   { letter: 'Z', image: z },

   { letter: '1', image: one },
   { letter: '2', image: two },
   { letter: '3', image: three },
   { letter: '4', image: four },
   { letter: '5', image: five },
   { letter: '6', image: six },
   { letter: '7', image: seven },
   { letter: '8', image: eight },
   { letter: '9', image: nine },
];

export const checkFirstLetter = (firstLetter) => {
   const alphabetObj = alphabetImages.find(alphabet => alphabet.letter === firstLetter);
   return alphabetObj ? alphabetObj.image : empty; // Return the image path if found, otherwise return an empty string
};
