<?php


/**
 * Class RenderView 
 * Renders Views for the app
 */

class RenderView
{
    /**
     * function render
     * @param string $view; specifies which view needs to be rendered
     * @param array $values[]; contains values which needs to be rendered in view
     */

    public function render($view, $values = [])
    {
        // if view exists, render it
        if (file_exists("app/views/$view"))
        {
            // extract variables into local scope
            extract($values);

            // render header
            require("app/views/header.php");
            
            // render view
            
            require("app/views/$view");
            // render footer
            require("app/views/footer.php");
        }

        // else throw error
        else
        {
            trigger_error("Invalid View : $view", E_USER_ERROR);
        }
    }

}