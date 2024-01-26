export default function Form() {
  return (
    <form encType="multipart/form-data" className="grid">
      <label htmlFor="images">Images</label>
      <input
        id="images"
        type="file"
        accept="image/*"
        name="images[]"
        multiple
      />
      <label htmlFor="title">Title</label>
      <input id="title" type="text" placeholder="title" name="title" />
      <label htmlFor="medium">Medium</label>
      <input id="medium" type="text" placeholder="medium" name="medium" />
      <label htmlFor="dimensions">dimensions</label>
      <input
        id="dimensions"
        type="text"
        placeholder="hXwXd"
        name="dimensions"
      />
      <label htmlFor="year">year</label>
      <input id="year" type="number" name="year" />

      <label htmlFor="description">description</label>
      <textarea id="description" name="description" rows={5} cols={33}>
        {" "}
        Enter description here...
      </textarea>
      <label htmlFor="start-date">start date</label>
      <input
        id="start-date"
        type="datetime-local"
        placeholder="start-date"
        name="start-date"
      />
      <label htmlFor="end-date">start date</label>
      <input
        id="end-date"
        type="datetime-local"
        placeholder="end-date"
        name="end-date"
      />
      <label htmlFor="start-bid">start bid</label>
      <input
        id="start-bid"
        type="number"
        placeholder="start-bid"
        name="start-bid"
      />
      <label htmlFor="reserve">reserve</label>
      <input id="reserve" type="number" placeholder="reserve" name="reserve" />
    </form>
  );
}
