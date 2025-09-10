namespace ToDoApp.Models
{
    public class CreateTodoReq
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
    }
}
