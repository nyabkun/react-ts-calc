export function InputUI({ dispatch }: any): JSX.Element {
  const [inputNum, setInputNum] = useState("");
  const ctx = useContext(AppContext);

  function onAddClick(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    setInputNum("");
    dispatch({
      ctx: ctx,
      value: inputNum,
    });
  }

  function onInputChange(event: React.FormEvent<HTMLDivElement>) {
    let value = (event.target as any).value;
    setInputNum(value);
  }

  return (
    <>
      <form onSubmit={onAddClick}>
        <TextField
          value={inputNum}
          variant="outlined"
          onInput={onInputChange}
          label="数字を入力"
        />
        <Button
          type="submit"
          disabled={!inputNum}
          startIcon={<Add />}
          variant="contained"
          color="primary"
        >
          追加
        </Button>
      </form>
    </>
  );
}
