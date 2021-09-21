import { render, screen,fireEvent } from '@testing-library/react';
import App from './App';
import {setupServer} from 'msw/node'
import {rest} from 'msw'

const server=setupServer(
  rest.get('https://randomuser.me/api/',(req,res,ctx)=>{
     return res(
           ctx.json(
             {
               results:[
                 {
                   name:{
                     first:"Peter",
                     last:"Johnson"
                   }
                 }
               ]
             }
           )
     )
  })
)

describe("Api Component Testing",()=>{
    beforeAll(()=>server.listen())
    afterEach(()=>server.resetHandlers())
    afterAll(()=>server.close())

    test("component should be loaded properly",async ()=>{
       render(<App/>)
       let result=await screen.findAllByText(/Peter/i);
       expect(result[0]).toHaveTextContent(/Peter/i)
       expect(result[0]).toHaveTextContent(/Johnson/i)
    })

    test('text box should impact target container',async ()=>{
      render(<App/>)
      const element=await screen.findByLabelText(/first/i)
      fireEvent.change(element,{target:{value:'Nicholas'}})
      const testElement=screen.getByRole("heading")
      expect(testElement).toHaveTextContent(/Nicholas/i)
    })
})