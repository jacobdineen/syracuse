library(shiny)
require(scatterplot3d)


ui <- fluidPage(
  titlePanel("Helix Plot"),
  sidebarLayout(
    sidebarPanel(
      sliderInput(inputId="start","Sequence start:", min = -30,max = -10,value = -20),
      sliderInput(inputId="stop","Sequence stop:", min = 10,max = 30,value = 10),
      sliderInput(inputId="incr","Sequence incr:", min = 0.01,max = 0.10,value = 0.01)),
    mainPanel(plotOutput("plot3d"))) 
)
server <- function(input, output) {
  output$plot3d <- renderPlot({
    z <- seq(input$start, input$stop, input$incr)
    x <- cos(z)
    y <- sin(z)
    scatterplot3d(x, y, z, highlight.3d = TRUE, 
                  col.axis = "blue", main = "Helix", pch = 20)})
}
shinyApp(ui = ui, server = server)
