using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Commands
{
    public class AddTodoCommand
    {
        public string TodoName { get; set; }
        public string TodoNotes { get; set; }
    }
}
