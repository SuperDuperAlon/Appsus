import { surveyService } from "../../../services/survey.service.js";

const { useState, useEffect } = React;

export function SurveyApp() {
  const [survey, setSurvey] = useState(null);
  const [answersMap, setAnswersMap] = useState({});

  useEffect(() => {
    surveyService.getById().then(setSurvey);
  }, []);

  function onChangeVal(id, val) {
    const answersToSave = { ...answersMap };
    answersToSave[id] = val;
    setAnswersMap(answersToSave);
  }

  if (!survey) return "<div></div>";

  const style = {
    backgroundColor: "lightcoral",
    padding: "5px",
    margin: "5px",
  };
  return (
    <section className="survey-app">
      {survey.cmps.map((cmp, idx) => (
        <div key={cmp.id} style={style}>
          <DynamicCmp
            type={cmp.type}
            info={cmp.info}
            val={answersMap[cmp.id] || ""}
            onChangeVal={(val) => {
              onChangeVal(cmp.id, val);
            }}
          />
        </div>
      ))}
      <hr />
      <pre>{JSON.stringify(answersMap, null, 2)}</pre>
    </section>
  );
}

function DynamicCmp(props) {
  switch (props.type) {
    case "textBox":
      return <TextBox {...props} />;
    case "selectBox":
      return <SelectBox {...props} />;
    case "textArea":
      return <TextArea {...props} />;
  }
}

function TextBox({ info, val = "", onChangeVal }) {
  const { label } = info;
  return (
    <label>
      {label}
      <input
        type="text"
        value={val}
        onChange={(ev) => {
          onChangeVal(ev.target.value);
        }}
      />
    </label>
  );
}

function TextArea({ info, val = "", onChangeVal }) {
  const { label } = info;
  return (
    <label>
      {label}
      <textarea
        value={val}
        onChange={(ev) => {
          onChangeVal(ev.target.value);
        }}
      />
    </label>
  );
}
