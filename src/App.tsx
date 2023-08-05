import { useState } from 'react'
import useTypedBrailleStrings from "./components/useTypedBrailleStrings";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import * as Tenji from 'tenji'

function App() {
  const [sumiji, setSumiji] = useState("漢点字");
  const [func, setFunc] = useState<number | string>(1);
  const selectChange = (e: SelectChangeEvent<number>) => {
    setFunc(e.target.value);
  };
  const [typedBrailleStrings, setTypedBrailleStrings] =
    useTypedBrailleStrings();

  return (
    <>
    <h2>点字作業ツール</h2>
    <div className="input">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel className="label">墨字→点字</InputLabel>
            <Select
              labelId="label"
              id="demo-simple-select"
              label="墨字→点字"
              onChange={selectChange}
            >
              <MenuItem value={1}>墨字→点字（1文字ずつ）</MenuItem>
              <MenuItem value={2}>墨字→点字</MenuItem>
              <MenuItem value={3}>点字→墨字（1文字ずつ）</MenuItem>
              <MenuItem value={4}>点字→墨字</MenuItem>
            </Select>
          </FormControl>
          </div>
          {func === 1 && (
            <>
            <span>墨字を入力してください。</span>
            <p>
            <TextField
              type="text"
              value={sumiji}
              key={"入力1"}
              onChange={(e) => {
                setSumiji(e.target.value);
              }}
            />
            </p>
            
            <p>
              {[...sumiji].map((rate: string) => `| 「${rate}」${Tenji.toTenji(rate, {kanji: true})} `)}|
            </p>
            </>
          )}

{func === 2 && (
            <>
      <span>墨字を入力してください。</span>
      <p>
      <TextField
        type="text"
        value={sumiji}
        key={"入力1"}
        onChange={(e) => {
          setSumiji(e.target.value);
        }}
      />
      </p>
      <p>
        結果：{Tenji.toTenji(sumiji, {kanji: true})}
      </p>
            </>
          )}
          {func === 3 && (
            <>
      <p>点字を入力してください。</p>
      <TextField
        variant="outlined"
        value={typedBrailleStrings}
        onKeyDown={(e) => {
          setTypedBrailleStrings(e);
        }}
        onKeyUp={(e) => {
          setTypedBrailleStrings(e);
        }}
      />
      <p>
        {[...Tenji.fromTenji(typedBrailleStrings, {kanji: true})].map((rate: string) => `| 「${Tenji.toTenji(rate, {kanji: true})}」${rate} `)}|
      </p>
            </>
          )}
          {func === 4 && (
            <>
      <p>点字を入力してください。</p>
      <TextField
        variant="outlined"
        value={typedBrailleStrings}
        onKeyDown={(e) => {
          setTypedBrailleStrings(e);
        }}
        onKeyUp={(e) => {
          setTypedBrailleStrings(e);
        }}
      />
      <p>
        結果：{Tenji.fromTenji(typedBrailleStrings, {kanji: true})}
      </p>
            </>
          )}
    </>
  )
}

export default App
