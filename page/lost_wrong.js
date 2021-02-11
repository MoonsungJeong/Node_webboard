module.exports = function(text='This is wrong link'){
    return `
    <main>
        <section>
            <div>
                <div class=" h_size_65 margin padding_3">
                    <div class="space_5 margin_tb padding_3 center">
                        ${text}<br><br>
                        Get new link Please <br><br>
                        <button><a href="/account/lost">lost ID/PW</a></button>
                    </div>
                </div>
            </div>
        </section>
    </main>
    `;
}