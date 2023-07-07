import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

// import { useAppSelector,useAppDispatch,shallowEqualApp } from '@/store'
// import { changeName } from '@/store/modules/counter'
import hyRequest from '@/service'

interface IProps {
 children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  // const { counter,name } = useAppSelector((state) => ({
  //   counter: state.counter.counter,
  //   name: state.counter.name
  // }),shallowEqualApp)

  useEffect(() => {
    hyRequest.get({
      url:'/banner'
    }).then(res => {
      console.log(res);
    })
  },[])

  // const dispatch = useAppDispatch()

  // function handleChangeName(){
  //   dispatch(changeName('哈哈哈哈'))
  // }


  return (
    <div>
      {/* <div>计数器：{counter}</div>
      <div>姓名：{name}</div>
      <button onClick={handleChangeName}>修改姓名</button> */}
    </div>
  )
}

export default memo(Recommend)
