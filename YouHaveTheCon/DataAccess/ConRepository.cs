using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.DataAccess
{
    public class ConRepository
    {
        string ConnectionString;
        public ConRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }
    }
}
