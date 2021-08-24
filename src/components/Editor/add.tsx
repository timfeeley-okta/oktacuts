import * as React from 'react'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal'
import { useAppDispatch, useAppSelector } from '@/state/index'
import { useAddRuleMutation } from '@/state/data'
import { setUI } from '@/state/ui'

import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid'
import { useToast } from '@/components/Toast/ToastProvider'

const AddModal = () => {
  const dispatch = useAppDispatch()
  const isShowing = useAppSelector(({ ui }) => ui)
  const [addNewRule] = useAddRuleMutation()
  const [issue, setIssue] = React.useState<string>()
  const { addToast } = useToast()

  const addRule = (e: React.FormEvent) => {
    e.preventDefault()
    addNewRule({
      rule: {
        shortCode: codeRef.current.value,
        url: urlRef.current.value,
      },
    })
      .unwrap()
      .catch((r) => addToast(r))
    return false
  }

  const closeModal = () => {
    setIssue(null)
    dispatch(setUI({ uiElement: 'addModal', value: false }))
  }

  const codeRef = React.useRef<HTMLInputElement>(null)
  const urlRef = React.useRef<HTMLInputElement>(null)

  return (
    <React.Fragment>
      <Modal
        unstable_ModalBackdropScroll={true}
        onClose={() => closeModal()}
        isOpen={isShowing.addModal}
        focusLock={true}
        returnFocus={true}>
        <form onSubmit={addRule}>
          <ModalHeader>Some Header</ModalHeader>
          <ModalBody>
            <Grid
              gridColumns={12}
              behavior={BEHAVIOR.fluid}
              gridMargins={0}
              gridGaps={0}
              gridGutters={0}>
              <Cell span={4}>
                <FormControl label="URL">
                  <Input required pattern="[A-Za-z0-9-_]*" inputRef={codeRef} />
                </FormControl>
              </Cell>
              <Cell span={1} />
              <Cell span={7}>
                <FormControl label="URL">
                  <Input type="url" required inputRef={urlRef} />
                </FormControl>
              </Cell>
            </Grid>
            {issue && <div>{issue}</div>}
          </ModalBody>
          <ModalFooter>
            <ModalButton kind="primary" type="submit">
              Add
            </ModalButton>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  )
}
export default AddModal
