import './App.css'
import { List } from './components/list'

function App() {
  return (
    <div className='max-w-[400px]'>
      <List 
        title={'귤은 겨울에 먹어야 해요'}
        type={'sell'}
        total={10}
        remain={2}
        location={'제주도 제주시'}
        due={'12/31'}
        price={3000}
        date={'12/31'}
        like={5}
        comments={7}
      />
      <List 
        title={'겨울엔 딸기도 맛있다'}
        type={'together'}
        total={7}
        remain={3}
        location={'이마트 부천시청점'}
        due={'12/31'}
        price={8000}
        date={'12/31'}
        like={15}
        comments={21}
      />
    </div>
  )
}

export default App
