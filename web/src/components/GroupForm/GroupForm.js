import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/web'

const GroupForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.group?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.group?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="slug"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Slug
        </Label>
        <TextField
          name="slug"
          defaultValue={props.group?.slug}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="slug" className="rw-field-error" />

        <Label
          name="year"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Year
        </Label>
        <TextField
          name="year"
          defaultValue={props.group?.year}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          type="number"
        />
        <FieldError name="year" className="rw-field-error" />

        <Label
          name="stage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Stage
        </Label>
        <TextField
          name="stage"
          defaultValue={props.group?.stage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="stage" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default GroupForm
