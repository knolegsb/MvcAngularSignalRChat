using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MvcAngularSignalRChat.Startup))]
namespace MvcAngularSignalRChat
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            // Proxy code
            app.MapSignalR();
        }
    }
}
