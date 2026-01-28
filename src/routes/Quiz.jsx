import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TrophyIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

/**
 * Helper function to shuffle array and return new array with original indices
 */
const shuffleArray = (array) => {
  const indexed = array.map((item, index) => ({ item, originalIndex: index }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return indexed;
};

// Quiz data structure - all in Norwegian (moved outside component to avoid dependency issues)
const quizzes = {
    'beginner-check': {
      title: 'Nybegynnersjekk',
      description: 'Test din forståelse av diagrammer, priser og grunnleggende konsepter',
      passScore: 70,
      questions: [
        {
          question: 'Hva betyr "24t endring"?',
          options: [
            'Hvor mye prisen har endret seg de siste 24 timene',
            'Hvor mange mynter som ble handlet på 24 timer',
            'Prisen for 24 timer siden',
            'Gjennomsnittsprisen over 24 timer'
          ],
          correct: 0,
          explanation: '24t endring viser prosentvis endring i pris de siste 24 timene. Et positivt tall betyr at prisen gikk opp, negativt betyr at den gikk ned.'
        },
        {
          question: 'Hva er markedsverdi (Market Cap)?',
          options: [
            'Totalverdien av alle mynter (pris × antall mynter)',
            'Høyeste pris noen gang',
            'Hvor mye penger som ble investert i dag',
            'Antall personer som eier mynten'
          ],
          correct: 0,
          explanation: 'Markedsverdi = Nåværende pris × Total antall mynter. Den representerer totalverdien av alle mynter i sirkulasjon. Høyere markedsverdi betyr vanligvis et mer etablert prosjekt.'
        },
        {
          question: 'Hvis en mynts prisdiagram går oppover (grønn/emerald), hva betyr det?',
          options: [
            'Prisen øker',
            'Prisen synker',
            'Volumet er høyt',
            'Det er et godt tidspunkt å selge'
          ],
          correct: 0,
          explanation: 'En grønn eller emerald linje som går oppover betyr at prisen øker over tid. Men tidligere resultater garanterer ikke fremtidige resultater - priser kan endre seg raskt.'
        },
        {
          question: 'Hva står ATH for?',
          options: [
            'All-Time High - den høyeste prisen noen gang',
            'Average Trading Hours',
            'After Trading Hours',
            'All-Time Holdings'
          ],
          correct: 0,
          explanation: 'ATH = All-Time High. Dette er den høyeste prisen en kryptovaluta noen gang har nådd. Det er nyttig for å forstå hvor langt nåværende pris er fra toppen.'
        },
        {
          question: 'Hvis Bitcoin er på $40,000 og går opp 10%, hva er den nye prisen?',
          options: [
            '$44,000',
            '$40,010',
            '$50,000',
            '$4,000'
          ],
          correct: 0,
          explanation: '10% av $40,000 = $4,000. Ny pris = $40,000 + $4,000 = $44,000. Prosentvise endringer beregnes alltid fra den opprinnelige prisen.'
        },
        {
          question: 'Hva betyr det når en mynt har "høy volatilitet"?',
          options: [
            'Prisen endrer seg raskt og drastisk',
            'Mange mennesker handler den',
            'Den er veldig sikker',
            'Den har høy markedsverdi'
          ],
          correct: 0,
          explanation: 'Høy volatilitet betyr at prisen kan endre seg drastisk på kort tid. Dette er vanlig i krypto - priser kan gå opp eller ned 10-20% på en enkelt dag.'
        },
        {
          question: 'Hva er forskjellen mellom "pris" og "markedsverdi"?',
          options: [
            'Pris er per mynt, markedsverdi er totalverdi',
            'De er det samme',
            'Pris er totalverdi, markedsverdi er per mynt',
            'Pris endrer seg, markedsverdi gjør ikke'
          ],
          correct: 0,
          explanation: 'Pris er hvor mye én mynt koster. Markedsverdi er prisen multiplisert med totalt antall mynter. For eksempel: hvis 1 mynt = $1 og det er 1 million mynter, er markedsverdien = $1 million.'
        },
        {
          question: 'Hvorfor kan en mynts pris falle selv om ingenting dårlig har skjedd?',
          options: [
            'Mange grunner: markedsstemning, andre mynter, normale svingninger',
            'Det betyr alltid at noe er galt',
            'Det skjer aldri',
            'Bare på grunn av dårlige nyheter'
          ],
          correct: 0,
          explanation: 'Kryptopriser er veldig volatile. Priser kan falle av mange grunner: generell markedsstemning, folk som tar fortjeneste, eller bare normale markedsfluktuasjoner. Ikke hver nedgang betyr at noe er galt.'
        }
      ]
    },
    'wallet-readiness': {
      title: 'Lommebokklarhet',
      description: 'Test din kunnskap om lommeboksikkerhet og sædfraser',
      passScore: 80,
      questions: [
        {
          question: 'Hva er en sædfrase?',
          options: [
            'En liste med ord som kan gjenopprette lommeboken din',
            'Lommebokkoden din',
            'Lommebokadressen din',
            'En kode for å låse opp lommeboken din'
          ],
          correct: 0,
          explanation: 'En sædfrase (gjenopprettingsfrase) er en liste med 12-24 ord som kan gjenopprette lommeboken din hvis du mister tilgang. Det er det viktigste å beskytte - alle som har den kan få tilgang til myntene dine.'
        },
        {
          question: 'Hvor bør du lagre sædfrasen din?',
          options: [
            'Skrevet på papir på et trygt sted',
            'I en tekstfil på datamaskinen din',
            'I en e-post til deg selv',
            'I et skjermbilde på telefonen din'
          ],
          correct: 0,
          explanation: 'Lagre aldri sædfrasen din digitalt (datamaskin, telefon, sky, e-post). Skriv den på papir og oppbevar den på et trygt sted. Vurder å lage en sikkerhetskopi på et annet sted.'
        },
        {
          question: 'Hva er en ikke-forvaltet lommebok?',
          options: [
            'En lommebok der du kontrollerer private nøkler',
            'En lommebok kontrollert av en børs',
            'En lommebok som ikke trenger passord',
            'En lommebok som bare lagrer mynter offline'
          ],
          correct: 0,
          explanation: 'I en ikke-forvaltet lommebok kontrollerer du private nøkler. Dette betyr at du har full kontroll, men du er også fullt ansvarlig for sikkerheten. Hvis du mister nøklene, mister du myntene.'
        },
        {
          question: 'Hvis noen får sædfrasen din, hva kan de gjøre?',
          options: [
            'Få tilgang og stjele alle myntene dine',
            'Ingenting, de trenger passordet ditt også',
            'Bare se saldoen din',
            'Bare sende mynter, ikke motta dem'
          ],
          correct: 0,
          explanation: 'Sædfrasen din ER lommeboken din. Alle som har den kan gjenopprette lommeboken på hvilken som helst enhet og få tilgang til alle myntene dine. Del den aldri med noen, noen gang.'
        },
        {
          question: 'Hva er forskjellen mellom en varm lommebok og en kald lommebok?',
          options: [
            'Varm = tilkoblet internett, Kald = offline',
            'Varm = gratis, Kald = koster penger',
            'Varm = for nybegynnere, Kald = for eksperter',
            'De er det samme'
          ],
          correct: 0,
          explanation: 'Varme lommebøker er tilkoblet internettet (lettere å bruke, mindre sikker). Kalde lommebøker er offline (mer sikker, vanskeligere å bruke). For store beløp anbefales kalde lommebøker.'
        },
        {
          question: 'Bør du dele sædfrasen din med kundeservice?',
          options: [
            'Aldri, legitim kundeservice ber aldri om den',
            'Ja, hvis de sier de trenger den',
            'Bare hvis det er den offisielle nettsiden',
            'Ja, for å verifisere kontoen din'
          ],
          correct: 0,
          explanation: 'Legitim kundeservice ber ALDRI om sædfrasen eller private nøkler. Alle som ber om det er svindlere. Del den aldri, uansett hvem som ber.'
        },
        {
          question: 'Hva bør du gjøre hvis du mister sædfrasen din?',
          options: [
            'Du kan ikke gjenopprette lommeboken - myntene er tapt',
            'Kontakt kundeservice',
            'Opprett en ny lommebok med samme passord',
            'Den vil automatisk gjenopprettes'
          ],
          correct: 0,
          explanation: 'Hvis du mister sædfrasen og ikke har en sikkerhetskopi, kan du ikke gjenopprette lommeboken. Myntene er permanent tapt. Dette er grunnen til at sikkerhetskopiering av sædfrasen er kritisk.'
        },
        {
          question: 'Hvor mange sikkerhetskopier av sædfrasen bør du ha?',
          options: [
            'Minst 2, lagret på forskjellige trygge steder',
            'Bare 1 er nok',
            'Så mange som mulig',
            'Ingen, den lagres automatisk'
          ],
          correct: 0,
          explanation: 'Ha minst 2 sikkerhetskopier på forskjellige fysiske steder. Dette beskytter mot brann, flom eller tyveri. Men husk: hver sikkerhetskopi er en sikkerhetsrisiko hvis noen finner den.'
        }
      ]
    },
    'meme-coin-readiness': {
      title: 'Meme-coin klarhet',
      description: 'Test din kunnskap om risikoer, likviditet og røde flagg',
      passScore: 75,
      questions: [
        {
          question: 'Hva er en "rug pull"?',
          options: [
            'Når utviklere forlater et prosjekt og tar alle pengene',
            'Når prisen går ned raskt',
            'Når en mynt blir fjernet fra børs',
            'Når handel blir satt på pause'
          ],
          correct: 0,
          explanation: 'En rug pull skjer når utviklere lager en token, promoterer den, får folk til å investere, deretter selger alle tokenene sine og forsvinner. Prisen krasjer til null og investorer mister alt.'
        },
        {
          question: 'Hva er "likviditet" i krypto?',
          options: [
            'Hvor lett du kan kjøpe eller selge uten å påvirke prisen',
            'Hvor mye penger som er i prosjektet',
            'Hvor mange personer som eier mynten',
            'Hvor sikker mynten er'
          ],
          correct: 0,
          explanation: 'Likviditet betyr hvor lett du kan handle. Høy likviditet = lett å kjøpe/selge. Lav likviditet = vanskelig å selge, og handelen din kan flytte prisen betydelig.'
        },
        {
          question: 'Hva er et rødt flagg for en potensiell svindelmynt?',
          options: [
            'Anonyme utviklere, ingen låst likviditet, løfter om garanterte avkastninger',
            'Høy markedsverdi',
            'Notert på store børser',
            'Har en nettside'
          ],
          correct: 0,
          explanation: 'Røde flagg inkluderer: anonymt team, ingen låst likviditet, løfter om garanterte avkastninger, aggressiv markedsføring, og nye tokens uten ekte bruksområde. Gjør alltid din egen research.'
        },
        {
          question: 'Hvorfor er låst likviditet viktig?',
          options: [
            'Det forhindrer utviklere i å trekke ut alle pengene',
            'Det gjør mynten dyrere',
            'Det øker prisen',
            'Det er ikke viktig'
          ],
          correct: 0,
          explanation: 'Låst likviditet betyr at utviklerne ikke umiddelbart kan ta ut alle handelsmidlene. Dette reduserer (men eliminerer ikke) risikoen for en rug pull.'
        },
        {
          question: 'Hva betyr "DYOR"?',
          options: [
            'Do Your Own Research - alltid verifiser før du investerer',
            'Don\'t You Own Risk',
            'Do You Own Returns',
            'Don\'t Yield On Returns'
          ],
          correct: 0,
          explanation: 'DYOR = Do Your Own Research (Gjør din egen research). Dette betyr at du bør undersøke et prosjekt selv før du investerer. Ikke bare følg det andre sier - verifiser informasjonen.'
        },
        {
          question: 'Hvis noen lover "garantert 10x avkastning," hva bør du gjøre?',
          options: [
            'Vær veldig skeptisk - det er sannsynligvis svindel',
            'Invester umiddelbart',
            'Fortell alle vennene dine',
            'Stol på dem hvis de har mange følgere'
          ],
          correct: 0,
          explanation: 'Ingen legitim investering tilbyr "garanterte" avkastninger, spesielt i krypto. Hvis det høres for godt ut til å være sant, er det sannsynligvis det. Dette er en vanlig svindeltaktikk.'
        },
        {
          question: 'Hva bør du sjekke før du investerer i en ny token?',
          options: [
            'Team, likviditet, kontraktverifisering, bruksområde, revisjoner',
            'Bare prisen',
            'Hvor mange personer som snakker om den',
            'Hvis den er populær på sosiale medier'
          ],
          correct: 0,
          explanation: 'Før du investerer, sjekk: hvem er utviklerne (er de doxxed?), er likviditeten låst?, er kontrakten verifisert?, har den et ekte bruksområde?, har den blitt revidert?'
        },
        {
          question: 'Hvor stor prosentandel av nye tokens mislykkes eller er svindel?',
          options: [
            'En veldig høy prosentandel - de fleste mislykkes',
            'Mindre enn 10%',
            'Omtrent 50%',
            'Nesten ingen'
          ],
          correct: 0,
          explanation: 'Overskridende flertall av nye tokens mislykkes eller viser seg å være svindel. Dette er grunnen til at det er kritisk å bare investere det du har råd til å miste og å gjøre grundig research.'
        }
      ]
    },
    'explorer-test': {
      title: 'Blokkutforsker-test',
      description: 'Test din kunnskap om å bruke blokkutforskere som Etherscan',
      passScore: 70,
      questions: [
        {
          question: 'Hva er en blokkutforsker?',
          options: [
            'En nettside for å se blokkjede-transaksjoner og data',
            'Et verktøy for å utvinne kryptovaluta',
            'En type lommebok',
            'En handelsplattform'
          ],
          correct: 0,
          explanation: 'En blokkutforsker (som Etherscan for Ethereum) lar deg se alle transaksjoner, lommebokadresser, token-kontrakter og annen blokkjede-data. Det er som en søkemotor for blokkjeden.'
        },
        {
          question: 'Hvordan kan du verifisere om en token-kontrakt er legitim?',
          options: [
            'Sjekk om den er verifisert på blokkutforskeren',
            'Spør på sosiale medier',
            'Stol på nettsiden',
            'Sjekk prisen'
          ],
          correct: 0,
          explanation: 'På blokkutforskere har verifiserte kontrakter et hake-merke. Dette betyr at kontraktkoden har blitt verifisert og matcher det utviklerne hevder. Uverifiserte kontrakter er mer risikable.'
        },
        {
          question: 'Hvilken informasjon kan du se på en tokens side i en blokkutforsker?',
          options: [
            'Holdere, transaksjoner, kontraktdetaljer, tilbud',
            'Bare prisen',
            'Bare navnet',
            'Ingenting nyttig'
          ],
          correct: 0,
          explanation: 'Blokkutforskere viser detaljert informasjon: antall holdere, alle transaksjoner, kontraktkildekode (hvis verifisert), totalt tilbud, og mer. Dette hjelper deg med å undersøke en token før du investerer.'
        },
        {
          question: 'Hva betyr det hvis en token har veldig få holdere?',
          options: [
            'Den kan være risikabel - kan være en ny eller svindel-token',
            'Den er definitivt trygg',
            'Det betyr at prisen vil gå opp',
            'Det spiller ingen rolle'
          ],
          correct: 0,
          explanation: 'Veldig få holdere kan være et rødt flagg. Det kan bety at tokenen er ny, eller det kan indikere svindel der utviklerne eier de fleste tokenene. Undersøk alltid videre.'
        },
        {
          question: 'Hvordan kan du sjekke om en lommebokadresse er en kontrakt?',
          options: [
            'Se etter "Kontrakt"-merkelapp på utforskeren',
            'Sjekk saldoen',
            'Se hvor mange transaksjoner',
            'Du kan ikke si'
          ],
          correct: 0,
          explanation: 'Blokkutforskere merker tydelig adresser som "Kontrakt" hvis de er smarte kontrakter. Vanlige lommebøker er merket som kontoer. Dette hjelper deg med å forstå hva du samhandler med.'
        },
        {
          question: 'Hva bør du sjekke før du sender tokens til en adresse?',
          options: [
            'Verifiser at adressen er riktig og matcher den tiltenkte mottakeren',
            'Bare stol på nettsiden',
            'Sjekk om den er populær',
            'Se om andre sendte til den'
          ],
          correct: 0,
          explanation: 'Dobbeltsjekk alltid adressen. Ett feil tegn betyr at tokenene går til feil sted og du kan ikke få dem tilbake. Kopier-lime og verifiser, ikke skriv manuelt.'
        },
        {
          question: 'Hva betyr "token unlock"?',
          options: [
            'Når låste tokens blir tilgjengelige for handel',
            'Når en token blir notert på en børs',
            'Når du låser opp lommeboken din',
            'Når prisen går opp'
          ],
          correct: 0,
          explanation: 'Token unlocks skjer når tidligere låste tokens (ofte holdt av team eller investorer) blir tilgjengelige for handel. Store unlocks kan forårsake prisfall når folk selger.'
        }
      ]
    }
};

/**
 * Quiz - Interactive knowledge tests for crypto beginners
 * One question at a time with progress tracking and immediate feedback
 */
const Quiz = () => {
  const { quizType } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const quiz = quizzes[quizType];

  // Shuffle options for each question when component mounts
  useEffect(() => {
    if (quiz) {
      const shuffled = quiz.questions.map(q => {
        const shuffledOptions = shuffleArray(q.options);
        const correctIndex = shuffledOptions.findIndex(item => item.originalIndex === q.correct);
        return {
          ...q,
          options: shuffledOptions.map(item => item.item),
          correct: correctIndex
        };
      });
      setShuffledQuestions(shuffled);
    }
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Quiz ikke funnet
          </h1>
          <Link
            to="/quizzes"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Tilbake til quizzer
          </Link>
        </div>
      </div>
    );
  }

  const questions = shuffledQuestions.length > 0 ? shuffledQuestions : quiz.questions;

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: selectedAnswer
      }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(answers[currentQuestion + 1] ?? null);
        setShowExplanation(false);
      } else {
        // Last question - show results
        const finalAnswers = {
          ...answers,
          [currentQuestion]: selectedAnswer
        };
        setAnswers(finalAnswers);
        setShowResult(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    const finalAnswers = showResult ? answers : { ...answers, [currentQuestion]: selectedAnswer };
    let correct = 0;
    questions.forEach((q, index) => {
      if (finalAnswers[index] === q.correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getRecommendations = (score) => {
    if (score >= quiz.passScore) {
      return {
        title: 'Bra jobbet! 🎉',
        message: `Du fikk ${score}% og besto! Du har god forståelse av ${quiz.title.toLowerCase()}.`,
        nextSteps: [
          'Fortsett å lære i Lær-seksjonen',
          'Prøv en annen quiz for å teste annen kunnskap',
          'Begynn å bruke verktøyene for å øve'
        ]
      };
    } else {
      return {
        title: 'Fortsett å lære! 📚',
        message: `Du fikk ${score}%. Du trenger ${quiz.passScore}% for å bestå. Gjennomgå spørsmålene du fikk feil og prøv igjen.`,
        nextSteps: [
          'Gjennomgå Lær-seksjonen relatert til dette emnet',
          'Les forklaringene for spørsmålene du bommet på',
          'Ta quizzen på nytt når du er klar'
        ]
      };
    }
  };

  // Results page
  if (showResult) {
    const score = calculateScore();
    const recommendations = getRecommendations(score);
    const correctAnswers = Object.values(answers).filter((ans, idx) => ans === questions[idx].correct).length;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
            <div className="mb-6">
              {score >= quiz.passScore ? (
                <TrophyIcon className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
              ) : (
                <InformationCircleIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              )}
              <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
                {recommendations.title}
              </h1>
              <div className="text-5xl font-light text-gray-900 dark:text-white mb-4">
                {score}%
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {correctAnswers} av {questions.length} riktige
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {recommendations.message}
              </p>
            </div>

            {/* Question Review */}
            <div className="mt-8 text-left space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Gjennomgå svarene dine
              </h2>
              {questions.map((q, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correct;
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      {isCorrect ? (
                        <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white mb-2">
                          {q.question}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="font-medium">Ditt svar:</span>{' '}
                          {q.options[userAnswer]}
                        </div>
                        {!isCorrect && (
                          <div className="text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                            <span className="font-medium">Riktig svar:</span>{' '}
                            {q.options[q.correct]}
                          </div>
                        )}
                        <div className="text-sm text-gray-700 dark:text-gray-300 mt-2 p-3 bg-white dark:bg-gray-700 rounded">
                          <span className="font-medium">Forklaring:</span> {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Steps */}
            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Hva er neste?
              </h3>
              <ul className="space-y-2 text-left">
                {recommendations.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quizzes"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Prøv en annen quiz
              </Link>
              <Link
                to="/learn"
                className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Fortsett å lære
              </Link>
              <button
                onClick={() => {
                  // Re-shuffle questions when retaking
                  const reshuffled = quiz.questions.map(q => {
                    const shuffledOptions = shuffleArray(q.options);
                    const correctIndex = shuffledOptions.findIndex(item => item.originalIndex === q.correct);
                    return {
                      ...q,
                      options: shuffledOptions.map(item => item.item),
                      correct: correctIndex
                    };
                  });
                  setShuffledQuestions(reshuffled);
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setAnswers({});
                  setShowResult(false);
                }}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Ta quiz på nytt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/quizzes"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm mb-4 inline-block"
          >
            ← Tilbake til quizzer
          </Link>
          <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
            {quiz.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {quiz.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Spørsmål {currentQuestion + 1} av {questions.length}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progress)}% fullført
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const wasAnswered = answers[currentQuestion] === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected || wasAnswered
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected || wasAnswered
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-600 dark:bg-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {(isSelected || wasAnswered) && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation (shown after selection) */}
          {selectedAnswer !== null && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-start gap-2">
                {selectedAnswer === question.correct ? (
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`font-medium mb-1 ${
                    selectedAnswer === question.correct
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-red-700 dark:text-red-400'
                  }`}>
                    {selectedAnswer === question.correct ? 'Riktig!' : 'Ikke helt'}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {question.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* "I'm not sure" option */}
          {selectedAnswer === null && (
            <button
              onClick={() => {
                // Show explanation without selecting an answer
                setShowExplanation(true);
              }}
              className="mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
            >
              Jeg er ikke sikker - vis forklaring
            </button>
          )}

          {showExplanation && selectedAnswer === null && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Hint:</span> {question.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Forrige
          </button>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              selectedAnswer === null
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Fullfør' : 'Neste'}
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
