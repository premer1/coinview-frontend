import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

/**
 * Quizzes - List of all available quizzes
 * Beginner-friendly quiz selection page
 */
const Quizzes = () => {
  const quizzes = [
    {
      id: 'beginner-check',
      title: 'Nybegynnersjekk',
      description: 'Test din forståelse av diagrammer, priser og grunnleggende kryptokonsepter',
      icon: '📊',
      difficulty: 'Nybegynner',
      questions: 8,
      timeEstimate: '5-10 minutter',
      passScore: 70,
      topics: ['Prisdiagrammer', 'Markedsverdi', '24t endringer', 'Høyeste/Laveste']
    },
    {
      id: 'wallet-readiness',
      title: 'Lommebokklarhet',
      description: 'Test din kunnskap om lommeboksikkerhet, sædfraser og trygg lagring',
      icon: '👛',
      difficulty: 'Mellomnivå',
      questions: 8,
      timeEstimate: '8-12 minutter',
      passScore: 80,
      topics: ['Sædfraser', 'Ikke-forvaltede lommebøker', 'Sikkerhet', 'Sikkerhetskopier']
    },
    {
      id: 'meme-coin-readiness',
      title: 'Meme-coin klarhet',
      description: 'Lær å identifisere risikoer, røde flagg og unngå svindler i meme-mynter',
      icon: '⚠️',
      difficulty: 'Mellomnivå',
      questions: 8,
      timeEstimate: '8-12 minutter',
      passScore: 75,
      topics: ['Rug pulls', 'Likviditet', 'Røde flagg', 'Gjør egen research']
    },
    {
      id: 'explorer-test',
      title: 'Blokkutforsker-test',
      description: 'Test din evne til å bruke blokkutforskere som Etherscan trygt',
      icon: '🔍',
      difficulty: 'Avansert',
      questions: 7,
      timeEstimate: '10-15 minutter',
      passScore: 70,
      topics: ['Blokkutforskere', 'Kontraktverifisering', 'Tokenholdere', 'Transaksjoner']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
            Test kunnskapen din
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ta interaktive quizzer for å se hvor mye du har lært. Hver quiz fokuserer på ulike aspekter ved kryptovaluta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              to={`/quizzes/${quiz.id}`}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{quiz.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {quiz.title}
                    </h2>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      quiz.difficulty === 'Beginner'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : quiz.difficulty === 'Intermediate'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                    }`}>
                      {quiz.difficulty === 'Beginner' ? 'Nybegynner' : quiz.difficulty === 'Intermediate' ? 'Mellomnivå' : 'Avansert'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {quiz.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <span>{quiz.questions} spørsmål</span>
                    <span>•</span>
                    <span>{quiz.timeEstimate}</span>
                    <span>•</span>
                    <span>Bestått: {quiz.passScore}%</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Temaer som dekkes:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quiz.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
                    <span>Start quiz</span>
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Tips for å ta quizzer
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Les hvert spørsmål nøye - det er ingen tidsbegrensning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Bruk "Jeg er ikke sikker"-alternativet hvis du trenger et hint</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Gjennomgå forklaringer etter hvert spørsmål for å lære</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Du kan ta quizzer på nytt så mange ganger du vil</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Hvis du ikke består, gjennomgå Lær-seksjonen og prøv igjen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA to Learn */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ny i kryptovaluta? Start med våre læringsguider først.
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Utforsk Lær-seksjonen
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
