module.exports = function(authStatusUI='<a href="/account/login" class="font_white"><i class="far fa-user fa-2x"></i></a>'){
    return `
    <header>
        <div class="flex_between space_3 font_white">
            <div><a class="btn_sidemenu pointer font_white"><i class="fas fa-bars fa-2x"></i></a></div>
            <h1><a href="/" class="font_white">Kangaroo</a></h1>
            <div>
                <ul class="flex_around">
                    <li class="margin_right">${authStatusUI}</li>
                    <li><a id="search_btn" class="font_white pointer"><i class="fas fa-search fa-2x"></i></a></li>
                </ul>
                <div class="search_bar_wrapper space_6">
                    <form onsubmit="return _AJAX_SEARCH_SEND(this)">
                        <input type="hidden" name="option" value="content">
                        <input class="search_bar size_010" name="keyword" type="text"/>
                        <button>search</button>
                    </form>
                </div>
            </div>
        </div>
        <nav>
            <ul class="flex_around line_top space_4 font_white padding">
                <li><a href="/board/total/1" class="font_white">Total</a></li>
                <li><a href="/board/free/1" class="font_white">Free</a></li>
                <li><a href="/board/info/1" class="font_white">Info</a></li>
            </ul>
        </nav>
    </header>
    `
}