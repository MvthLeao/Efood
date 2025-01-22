import { useEffect, useState } from 'react'
import Card from '../../Card'
import { DeliveryButton } from '../../Cart/styles'
import { InputGroup, Row, Title } from './styles'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../../store'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { clear, open } from '../../../store/reducers/cart'
import { usePurchaseMutation } from '../../../services/api'
import { getTotalPrice, parseToBrl } from '../../../utils'

const Checkout = ({ onClose }: { onClose: () => void }) => {
  const [payWith, setPayWith] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const form = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      cep: '',
      number: '',
      complement: '',
      nameCard: '',
      numberCard: '',
      codeCard: '',
      monthCard: '',
      yearCard: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'No mínimo 5 caracteres')
        .required('Este campo é obrigatório'),
      address: Yup.string().required('Este campo é obrigatório'),
      city: Yup.string().required('Este campo é obrigatório'),
      cep: Yup.string()
        .min(8, 'CEP inválido')
        .max(8)
        .required('Este campo é obrigatório'),
      number: Yup.number().required('Este campo é obrigatório'),
      complement: Yup.string(),

      // validação minuciosa para pagamento
      nameCard: Yup.string()
        .min(5, 'No mínimo 5 caracteres')
        .when(() =>
          payWith
            ? Yup.string().required('Este campo é obrigatório')
            : Yup.string()
        ),
      numberCard: Yup.string()
        .min(5, 'No mínimo 5 caracteres')
        .when(() =>
          payWith
            ? Yup.string().required('Este campo é obrigatório')
            : Yup.string()
        ),
      codeCard: Yup.string()
        .max(3, 'Somente 3 dígitos')
        .when(() =>
          payWith
            ? Yup.string().required('Este campo é obrigatório')
            : Yup.string()
        ),
      monthCard: Yup.string().when(() =>
        payWith
          ? Yup.string().required('Este campo é obrigatório')
          : Yup.string()
      ),
      yearCard: Yup.string().when(() =>
        payWith
          ? Yup.string().required('Este campo é obrigatório')
          : Yup.string()
      )
    }),
    onSubmit: (values) => {
      if (!items || !Array.isArray(items)) {
        console.error(
          'A variável `items` não foi declarada ou não é uma lista.'
        )
        return
      }

      purchase({
        delivery: {
          name: values.name,
          local: {
            address: values.address,
            city: values.city,
            cep: values.cep,
            number: values.number,
            complement: values.complement
          }
        },
        payment: {
          card: {
            nameCard: values.nameCard,
            numberCard: values.numberCard,
            codeCard: Number(values.codeCard),
            validation: {
              monthCard: Number(values.monthCard),
              yearCard: Number(values.yearCard)
            }
          }
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.preco
        }))
      })
    }
  })

  const mensageError = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

  const continueToPayment = async () => {
    await form.validateForm()
    form.setTouched({
      name: true,
      address: true,
      city: true,
      cep: true,
      number: true
    })

    const deliveryValid =
      !form.errors.name &&
      !form.errors.address &&
      !form.errors.city &&
      !form.errors.cep &&
      !form.errors.number

    if (deliveryValid) {
      setPayWith(true)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  const openCart = () => {
    dispatch(open())
  }

  const returnCart = () => {
    setCartOpen(true)
    onClose()
    openCart()
  }

  const allConclude = () => {
    setCartOpen(true)
    onClose()
    navigate('/')
  }

  if (items.length === 0 && !isSuccess) {
    return <Navigate to="/" />
  }

  return (
    <div>
      {!cartOpen && isSuccess && data ? (
        <Card>
          <>
            <div className="MensagemDeConcusão">
              <h2>Pedido realizado - {data.orderId}</h2>
              <p>
                Estamos felizes em informar que seu pedido já está em processo
                de preparação e, em breve, será entregue no endereço fornecido.
              </p>
              <p>
                Gostaríamos de ressaltar que nossos entregadores não estão
                autorizados a realizar cobranças extras.
              </p>
              <p>
                Lembre-se da importância de higienizar as mãos após o
                recebimento do pedido, garantindo assim sua segurança e
                bem-estar durante a refeição.
              </p>
              <p>
                Esperamos que desfrute de uma deliciosa e agradável experiência
                gastronômica. Bom apetite!
              </p>
              <button type="button" onClick={allConclude}>
                Concluir
              </button>
            </div>
          </>
        </Card>
      ) : (
        <Card>
          <div>
            {!payWith ? (
              <>
                <div className="Entrega">
                  <form onSubmit={form.handleSubmit}>
                    <Title>Entrega</Title>
                    <Row>
                      <InputGroup>
                        <label htmlFor="name">Quem irá receber</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.values.name}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur} // p saber se o campo já foi manipulado
                          required
                        />
                        <small>{mensageError('name', form.errors.name)}</small>
                      </InputGroup>

                      <InputGroup>
                        <label htmlFor="address">Endereço</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={form.values.address}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          required
                        />
                        <small>
                          {mensageError('address', form.errors.address)}
                        </small>
                      </InputGroup>

                      <InputGroup>
                        <label htmlFor="city">Cidade</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={form.values.city}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          required
                        />
                        <small>{mensageError('city', form.errors.city)}</small>
                      </InputGroup>

                      <InputGroup className="areaFlex">
                        <div>
                          <label htmlFor="cep">CEP</label>
                          <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={form.values.cep}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            required
                          />
                          <small>{mensageError('cep', form.errors.cep)}</small>
                        </div>
                        <div>
                          <label htmlFor="number">Número</label>
                          <input
                            type="number"
                            id="number"
                            name="number"
                            value={form.values.number}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            required
                          />
                          <small>
                            {mensageError('number', form.errors.number)}
                          </small>
                        </div>
                      </InputGroup>

                      <InputGroup>
                        <label htmlFor="complement">
                          Complemento ( opcional )
                        </label>
                        <input
                          type="text"
                          id="complement"
                          name="complement"
                          value={form.values.complement}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                        />
                        <small>
                          {mensageError('complement', form.errors.complement)}
                        </small>
                      </InputGroup>
                    </Row>

                    <DeliveryButton type="submit" onClick={continueToPayment}>
                      Continuar com o pagamento
                    </DeliveryButton>
                    <DeliveryButton type="button" onClick={returnCart}>
                      Voltar ao carrinho
                    </DeliveryButton>
                  </form>
                </div>
              </>
            ) : (
              <div className="Pagamento">
                <form onSubmit={form.handleSubmit}>
                  <>
                    <h2>
                      Pagamento - Valor a pagar de
                      <span>{parseToBrl(getTotalPrice(items))}</span>
                    </h2>
                    <Row>
                      <InputGroup>
                        <label htmlFor="nameCard">Nome no cartão</label>
                        <input
                          type="text"
                          id="nameCard"
                          name="nameCard"
                          value={form.values.nameCard}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          required
                        />
                        <small>
                          {mensageError('nameCard', form.errors.nameCard)}
                        </small>
                      </InputGroup>

                      <InputGroup className="areaFlex">
                        <div>
                          <label htmlFor="numberCard">Número do cartão</label>
                          <input
                            type="text"
                            id="numberCard"
                            name="numberCard"
                            value={form.values.numberCard}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            required
                          />
                          <small>
                            {mensageError('numberCard', form.errors.numberCard)}
                          </small>
                        </div>
                        <div>
                          <label htmlFor="codeCard">CVV</label>
                          <input
                            type="number"
                            id="codeCard"
                            name="codeCard"
                            value={form.values.codeCard}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            required
                          />
                          <small>
                            {mensageError('codeCard', form.errors.codeCard)}
                          </small>
                        </div>
                      </InputGroup>

                      <InputGroup className="areaFlex">
                        <div>
                          <label htmlFor="monthCard">Mês de vencimento</label>
                          <input
                            type="number"
                            id="monthCard"
                            name="monthCard"
                            value={form.values.monthCard}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            required
                          />
                          <small>
                            {mensageError('monthCard', form.errors.monthCard)}
                          </small>
                        </div>
                        <div>
                          <label htmlFor="yearCard">Ano de vencimento</label>
                          <input
                            type="number"
                            id="yearCard"
                            name="yearCard"
                            value={form.values.yearCard}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            required
                          />
                          <small>
                            {mensageError('yearCard', form.errors.yearCard)}
                          </small>
                        </div>
                      </InputGroup>
                    </Row>

                    <DeliveryButton type="submit" disabled={isLoading}>
                      {isLoading
                        ? 'Sua compra está sendo finalizada'
                        : 'Finalizar pagamento'}
                    </DeliveryButton>
                    <DeliveryButton
                      type="button"
                      onClick={() => setPayWith(false)}
                    >
                      Voltar para a edição de endereço
                    </DeliveryButton>
                  </>
                </form>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

export default Checkout
