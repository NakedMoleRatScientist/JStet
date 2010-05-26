

network = new WebSocket("ws://localhost:7000");
network.onopen = function ()
{
  console.log("onopen");
}
network.onmessage = function (ev)
{
  console.log(ev.data);
}