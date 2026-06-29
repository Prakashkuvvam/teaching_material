import {useState, useCallback, type ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

type QuestionState = {
  selected: number | null;
  revealed: boolean;
};

export default function Quiz({questions}: {questions: Question[]}): ReactNode {
  const [studyMode, setStudyMode] = useState(false);
  const [answers, setAnswers] = useState<Record<number, QuestionState>>({});
  const [submitted, setSubmitted] = useState(false);

  const getState = useCallback(
    (qId: number): QuestionState =>
      answers[qId] ?? {selected: null, revealed: false},
    [answers],
  );

  const selectOption = useCallback(
    (qId: number, idx: number) => {
      if (submitted) return; // lock after final submit
      setAnswers(prev => {
        const current = prev[qId] ?? {selected: null, revealed: false};
        if (studyMode) {
          // Instant feedback: selecting reveals immediately
          return {...prev, [qId]: {selected: idx, revealed: true}};
        }
        // Submit mode: just select, don't reveal yet
        return {...prev, [qId]: {selected: idx, revealed: current.revealed}};
      });
    },
    [studyMode, submitted],
  );

  const submitAll = useCallback(() => {
    setSubmitted(true);
    setAnswers(prev => {
      const next = {...prev};
      questions.forEach(q => {
        const current = next[q.id] ?? {selected: null, revealed: false};
        if (current.selected !== null) {
          next[q.id] = {...current, revealed: true};
        }
      });
      return next;
    });
  }, [questions]);

  const reset = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
  }, []);

  const correctCount = questions.filter(q => {
    const state = getState(q.id);
    return state.selected === q.correct;
  }).length;

  const allAnswered = questions.every(q => getState(q.id).selected !== null);

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <span className={styles.score}>
          {Object.values(answers).some(s => s.revealed)
            ? `${correctCount} / ${questions.length} correct`
            : `${questions.length} question${questions.length > 1 ? 's' : ''}`}
        </span>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={studyMode}
            onChange={() => {
              setStudyMode(!studyMode);
              reset();
            }}
          />
          <span>Study Mode</span>
        </label>
      </div>

      {studyMode && (
        <div className={styles.modeHint}>
          Instant feedback — click an option to see if you're right
        </div>
      )}

      {questions.map((q, qi) => {
        const state = getState(q.id);
        return (
          <div key={q.id} className={styles.questionBlock}>
            <div className={styles.questionText}>
              <strong>Question {qi + 1}:</strong> {q.question}
            </div>
            <div className={styles.options}>
              {q.options.map((opt, oi) => {
                let optionClass = styles.option;
                const isSelected = state.selected === oi;
                const isCorrect = oi === q.correct;

                if (state.revealed) {
                  if (isCorrect) {
                    optionClass = clsx(optionClass, styles.optionCorrect);
                  } else if (isSelected && !isCorrect) {
                    optionClass = clsx(optionClass, styles.optionWrong);
                  } else {
                    optionClass = clsx(optionClass, styles.optionDimmed);
                  }
                } else if (isSelected) {
                  optionClass = clsx(optionClass, styles.optionSelected);
                }

                return (
                  <button
                    key={oi}
                    className={optionClass}
                    onClick={() => selectOption(q.id, oi)}
                    disabled={state.revealed && !studyMode}
                  >
                    <span className={styles.optionLabel}>{OPTION_LABELS[oi]}</span>
                    <span className={styles.optionText}>{opt}</span>
                  </button>
                );
              })}
            </div>
            {state.revealed && (
              <div className={styles.explanation}>
                {state.selected === q.correct ? '✅ ' : '❌ '}
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!studyMode && (
        <div className={styles.actions}>
          {!submitted ? (
            <button
              className={styles.submitBtn}
              onClick={submitAll}
              disabled={!allAnswered}
            >
              {allAnswered ? 'Submit Answers' : 'Answer all questions first'}
            </button>
          ) : (
            <button className={styles.resetBtn} onClick={reset}>
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
